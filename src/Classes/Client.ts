import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import { Settings, credentials, consts } from "../settings";
import { superUsers } from "../Lib/config";
import { TaskHandler } from "./TaskHandler";
import { logger } from "../Lib/Utils";
import { join } from "path";
import Enmap from "enmap";
import petitio from "petitio";
import { types } from "pg";
import Knex from "knex";
import { connection } from "../settings";
import { TextChannel, GuildMember, Message, WebhookClient } from "discord.js";
import { malilStartGiveaway, fn, infraction, guildSettingsInterface } from "../Lib/Utils";
import { CommandInteraction } from "discord.js";
import en from "../translation/en";
import owo from "../translation/owo";
types.setTypeParser(20, BigInt);
const lan = { en: 1, owo: 2 };

interface Option {
	owners?: string | string[];
	superUsers?: string | string[];
	token?: string;
}

export default class Client extends AkairoClient {
	commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "Commands"),
		prefix: async (message) => {
			if (message?.guild == null) return [Settings.prefix, "malil"];
			else return [await this.getPrefix(message.guild.id), "malil"];
		},
		aliasReplacement: /-g/,
		allowMention: true,
		handleEdits: true,
		ignorePermissions: superUsers,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 6000,
		argumentDefaults: {
			prompt: {
				modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				timeout: "You took too long, the command has been cancelled now.",
				ended: "You exceeded the maximum amout of tries, this command has now been cancelled.",
				cancel: "This command has been cancelled now.",
				retries: 3,
				time: 30000,
			},
			otherwise: "",
		},
	});
	listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "Listeners"),
	});

	inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, "..", "Inhibitors"),
	});

	taskHandler: TaskHandler = new TaskHandler(this, {
		directory: join(__dirname, "..", "Tasks"),
	});

	config: Option;

	constructor(config: Option) {
		super({
			ownerID: config.owners,
			superUserID: config.superUsers,
			intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_WEBHOOKS", "GUILD_INTEGRATIONS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING"],
			messageSweepInterval: 1800, // 30 mins
			messageCacheLifetime: 1800, // 30 mins
			presence: {
				activities: [
					{
						name: `guilds | /invite`,
						type: "COMPETING",
					},
				],
			},
			allowedMentions: {
				parse: ["users"],
			},
		});
		this.webhook = new WebhookClient(credentials.webhook.id, credentials.webhook.token);
		this.settings = Settings;
		this.consts = consts;
		this.colors = consts.colors;
		this.credentials = credentials;
		this.config = config;
		this.logger = logger;
		this.random = (i: number) => Math.floor(Math.random() * i);
		this.knex = Knex({
			client: "pg",
			connection,
		});
		const databases = ["gp", "logchannel", "blacklist", "guilddata", "mutes", "releases", "userdata"];
		for (const item in databases) {
			const name = databases[item];
			this[name] = new Enmap({ name, dataDir: join(__dirname, "..", "..", "data", name), polling: Settings.polling });
		}
	}

	_init(): void {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});

		this.inhibitorHandler.loadAll();
		this.taskHandler.loadAll();
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
		this.taskHandler.startAll();
	}

	async goo(): Promise<unknown> {
		await this._init();
		return this.login(this.config.token);
	}
	////////////////////////////////
	// DATABSE STUFF ///////////////
	////////////////////////////////

	find(table, limit, order_by, sort_order = "desc"): Promise<any> {
		if (!limit) {
			return this.knex(table);
		} else if (limit && !order_by) {
			return this.knex(table).limit(limit);
		} else if (limit && order_by) {
			return this.knex(table).limit(limit).orderBy(order_by, sort_order);
		}
	}

	findBy(table, filter): Promise<any> {
		return this.knex(table).where(filter);
	}

	async insert(table, data) {
		const [id] = await this.knex(table).insert(data);

		return await this.findBy(table, { id });
	}

	remove(table, filter) {
		return this.knex(table).where(filter).delete();
	}

	async update(table, data, filter) {
		await this.knex(table).where(filter).update(data);
		return await this.knex(table).where(filter);
	}
	closeConnection() {
		return this.knex.destroy();
	}
	async CreateTables() {
		try {
			await this.knex.schema.createTable("users", (table) => {
				table.bigInteger("id").primary();
				table.integer("iq");
				table.integer("votes");
				table.bigInteger("messages");
			});
		} catch {}

		try {
			await this.knex.schema.createTable("guilds", (table) => {
				table.bigInteger("id").primary();
				table.bigInteger("muterole");
				table.bigInteger("modrole");
				table.bigInteger("github");
				table.bigInteger("githubchannel");
				table.bigInteger("modlogs");
				table.bigInteger("emoji");
				table.bigInteger("starboard");
				table.integer("emojicount");
				table.boolean("stickers");
				table.string("prefix");
			});
		} catch {}
		try {
			await this.knex.schema.createTable("infractions", (table) => {
				table.bigInteger("when");
				table.bigInteger("user");
				table.bigInteger("id").primary();
				table.bigInteger("guild");
				table.bigInteger("moderator");
				table.string("reason");
				table.string("type");
			});
		} catch {}
	}

	async createInfraction(user: string, infraction: string, guild: string, moderator: string, reason: string, type: string): Promise<any> {
		const data = {
			when: BigInt(Date.now()),
			user: BigInt(user),
			id: BigInt(Number(infraction) + this.random(99)),
			guild: BigInt(guild),
			moderator: BigInt(moderator),
			reason,
			type,
		};
		await this.knex("infractions").insert(data);
	}
	async getGuildSettings(guildId: string): Promise<guildSettingsInterface> {
		const id = BigInt(guildId);
		try {
			const [guild] = await this.findBy("guilds", { id });
			if (!guild) {
				const guildData = this.guildData(id);
				await this.knex("guilds").insert(guildData);
				return guildData;
			}
			return guild;
		} catch {
			const guildData = this.guildData(id);
			return guildData;
		}
	}
	async deleteInfraction(infractionId: string): Promise<void> {
		const id = BigInt(infractionId);
		this.remove("infractions", { id });
	}
	async deleteInfractions(userId: string, guildId: string): Promise<void> {
		const guild = BigInt(guildId);
		const user = BigInt(userId);
		this.remove("infractions", { user, guild });
	}
	async getInfractions(userId: string, guildId: string): Promise<infraction[]> {
		const user = BigInt(userId);
		const guild = BigInt(guildId);
		const infractions = await this.knex("infractions").where({ user, guild });
		return infractions;
	}
	async getModActions(modId: string, guildId: string): Promise<infraction[]> {
		const moderator = BigInt(modId);
		const guild = BigInt(guildId);
		const infractions = await this.knex("infractions").where({ moderator, guild });
		return infractions;
	}
	query(input: any): any {
		return this.knex.raw(input);
	}
	async kill() {
		return await this.knex.destroy();
	}
	async getUser(i: string | bigint): Promise<{ id: bigint; iq: number; votes: number; messages: bigint }> {
		const id = typeof i == "bigint" ? i : BigInt(i);
		const [user] = await this.findBy("users", { id });

		if (!user) {
			const userData = {
				id: id,
				iq: Math.floor(Math.random() * 150) + 1,
				votes: 0,
				messages: 1n,
			};
			await this.knex("users").insert(userData);
			return userData;
		}
		return user;
	}
	async getModChannels(guilId: string): Promise<string[]> {
		const data = await this.getGuildSettings(guilId);
		if (!data.modonlychannels) return [];
		return JSON.parse(data.modonlychannels);
	}
	async addModChannel(guilId: string, channel: string): Promise<string[]> {
		const data = await this.getGuildSettings(guilId);
		const thing = data.modonlychannels ? data.modonlychannels : "[]";
		const channels = Array.from(new Set(JSON.parse(thing)).add(channel));

		const id = BigInt(guilId);
		await this.knex("guilds")
			.where({ id })
			.update({ modonlychannels: JSON.stringify(channels) });

		return <string[]>channels;
	}
	async delModChannel(guilId: string, channel: string): Promise<string[]> {
		const data = await this.getGuildSettings(guilId);
		const thing = data.modonlychannels ? data.modonlychannels : "[]";
		const set = new Set(JSON.parse(thing));
		set.delete(channel);
		const channels = Array.from(set);

		const id = BigInt(guilId);
		await this.knex("guilds")
			.where({ id })
			.update({ modonlychannels: JSON.stringify(channels) });

		return <string[]>channels;
	}

	async increaseVotes(user: string | bigint, amount: number) {
		const id = BigInt(user);
		const votes = Number((await this.getUser(user)).votes);
		const newvotes = votes + Number(amount);

		await this.knex("users").where({ id }).update({ votes: newvotes });

		return newvotes;
	}
	guildData(id: bigint) {
		return {
			modonlychannels: "[]",
			id: id,
			muterole: null,
			modrole: null,
			github: null,
			modlogs: null,
			emoji: null,
			starboard: null,
			emojicount: null,
			stickers: null,
			prefix: null,
			githubchannel: null,
			language: null,
		};
	}
	async increaseIq(user: string | bigint, amount: number) {
		const id = BigInt(user);
		const iq = (await this.getUser(user)).iq;
		const newiq = Number(iq) + Number(amount);

		await this.knex("users").where({ id }).update({ iq: newiq });

		return newiq;
	}
	async getPrefix(i: string) {
		const guild = await this.getGuildSettings(i);
		return guild?.prefix || Settings.prefix;
	}
	async setLang(guildID: string, language: number) {
		const id = BigInt(guildID);
		const [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ language });
		} else if (!guild) {
			await this.knex("guilds").insert(this.guildData(id));
		}

		return language;
	}
	async setPrefix(guildID: string, prefix: string) {
		const id = BigInt(guildID);
		const [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ prefix });
		} else if (!guild) {
			await this.knex("guilds").insert(this.guildData(id));
		}

		return prefix;
	}
	////////////////////////////////
	// Language STUFF //////////////
	////////////////////////////////
	async get(message: Message, thing: string, ...args: string[]): Promise<Message> {
		const language = (await this.getGuildSettings(message.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return message.channel.send({ content: translation });
	}
	async iget(interaction: CommandInteraction, thing: string, ...args: string[]): Promise<void> {
		const language = (await this.getGuildSettings(interaction.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return interaction.reply({ content: translation });
	}
	async sget(interaction: CommandInteraction | Message, thing: string, ...args: string[]): Promise<string> {
		const language = (await this.getGuildSettings(interaction.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return <string>translation;
	}
	async getObject(message: Message, things): Promise<any> {
		const language = (await this.getGuildSettings(message.guild.id)).language || lan.en;

		const returnData = {};
		if (language == 1) {
			for (const key in things) {
				let translation = en[key];
				if (typeof translation == "function") {
					translation = translation(...things[key]);
				}
				returnData[key] = translation;
			}
		} else if (language == 2) {
			for (const key in things) {
				let translation = owo[key];

				if (typeof translation == "function") {
					translation = translation(...things[key]);
				}
				returnData[key] = translation;
			}
		}
		return returnData;
	}
	////////////////////////////////
	// GIVEAWAYS STUFF /////////////
	////////////////////////////////
	// getGiveaways(): malilStartGiveaway[] {
	// 	return this.gp.ensure("givaways", []);
	// }
	// create(i: malilStartGiveaway) {
	// 	this.gp.ensure("givaways", []);
	// 	this.gp.push("giveaways", i);
	// 	this.rungiveaway(i);
	// }

	// time(time: number) {
	// 	return time + Date.now();
	// }
	// start(giveaway: malilStartGiveaway) {
	// 	if (!giveaway.time) throw new console.error("THERE MUST BE A END TIME");

	// 	return this.create(giveaway);
	// }
	// async end(giveaway: malilStartGiveaway, users: string[]) {
	// 	const channel = (this.channels.cache.get(giveaway.channel) || (await this.channels.fetch(giveaway.channel))) as TextChannel;

	// 	const message = channel.messages.cache.get(giveaway.message) || (await channel.messages.fetch(giveaway.message));

	// 	if (!channel || !message) return;
	// 	const oldEmbed = message.embeds;
	// 	message.edit(this.util.embed(oldEmbed).setDescription("This giveaway has ended"));
	// 	message.channel.send(`the giveaway for **${giveaway.prize}** has ended and the winner is ${users.map((i) => `${i}, `)}`);
	// 	return true;
	// }
	// async getWinners(giveaway: malilStartGiveaway) {
	// 	const channel = (this.channels.cache.get(giveaway.channel) || (await this.channels.fetch(giveaway.channel))) as TextChannel;
	// 	const message = channel.messages.cache.get(giveaway.message) || (await channel.messages.fetch(giveaway.message));

	// 	if (!channel || !message) return;

	// 	const winners: string[] = [];

	// 	for (let i = 0; i < giveaway.winners; i++) {
	// 		winners.push(this.getWinner(message, giveaway));
	// 	}
	// 	return winners;
	// }
	// getWinner(message: Message, giveaway: malilStartGiveaway) {
	// 	const reaction = message.reactions.cache[Math.floor(Math.random() * message.reactions.cache.size)];
	// 	if (this.checkUser(reaction.member, giveaway)) {
	// 		return reaction.member;
	// 	} else {
	// 		this.getWinner(message, giveaway);
	// 	}
	// }
	// checkUser(member: GuildMember, giveaway: malilStartGiveaway) {
	// 	for (const role of giveaway.options.roles) {
	// 		if (!member.roles.cache.has(role)) return false;
	// 	}
	// 	return true;
	// }
	// userChecks(giveaway: malilStartGiveaway, member: GuildMember) {
	// 	for (const role of giveaway.options.roles) {
	// 		if (!member.roles.cache.has(role)) return false;
	// 		else continue;
	// 	}
	// }
	// loadAll() {
	// 	for (const giveaway of this.getGiveaways()) {
	// 		this.rungiveaway(giveaway);
	// 	}
	// }
	// rungiveaway(giveaway: malilStartGiveaway) {
	// 	setTimeout(async () => {
	// 		this.end(giveaway, await this.getWinners(giveaway));
	// 	}, giveaway.time - Date.now());
	// }
	async post(): Promise<void> {
		const topgg = {
			server_count: this.guilds.cache.size,
			shard_count: this.shard.ids.length,
			shard_id: this.shard.ids[0],
		};
		try {
			await petitio(`https://top.gg/api/bots/${this.user.id}/stats`, "POST").header("Authorization", credentials.bottokens.topgg).body(topgg).send();
		} catch (err) {
			console.warn("[ COULD NOT POST TO TOPGG ]");
		}

		const discordbotlist = {
			guilds: this.guilds.cache.size,
			users: this.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
			shard_id: this.shard.ids[0],
		};
		try {
			await petitio(`https://discordbotlist.com/api/v1/bots/${this.user.id}/stats`, "POST").header("Authorization", credentials.bottokens.discordbotlist).body(discordbotlist).send();
		} catch (err) {
			console.warn("[ COULD NOT POST TO discordbotlist ]");
		}
	}
}

declare module "discord-akairo" {
	interface AkairoClient {
		webhook: WebhookClient;
		knex: any;
		commandHandler: CommandHandler;
		random: (number: number) => number;
		settings: typeof Settings;
		credentials: typeof credentials;
		consts: typeof consts;
		colors: typeof consts.colors;
		logger: typeof logger;
		blacklist: Enmap;
		releases: Enmap;
		logchannel: Enmap;
		gp: Enmap;
		guilddata: Enmap;
		mutes: Enmap;
	}
}
