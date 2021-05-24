/* eslint-disable */
import { types } from "pg";
types.setTypeParser(20, BigInt);

import Client from "./Client";
import Knex from "knex";
import { connection } from "../settings";
export default class db {
	client: Client;
	guilds: any;
	users: any;
	gp: any;
	constructor(client: Client) {
		this.client = client;
	}
	knex = Knex({
		client: "pg",
		connection,
	});
	find(table, limit, order_by, sort_order = "desc") {
		if (!limit) {
			return this.knex(table);
		} else if (limit && !order_by) {
			return this.knex(table).limit(limit);
		} else if (limit && order_by) {
			return this.knex(table).limit(limit).orderBy(order_by, sort_order);
		}
	}

	findBy(table, filter) {
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
	/**
	 *
	 * @param user id of the user you want to infraction
	 * @param infraction message id as a unique identifier
	 * @param guild  Guild ID these are store globally and not per guild
	 * @param reason
	 * @param type ban, kick, mute, unmute, warn
	 */
	async createInfraction(user: string, infraction: string, guild: string, moderator: string, reason: string, type: string): Promise<any> {
		const data = {
			when: BigInt(Date.now()),
			user: BigInt(user),
			id: BigInt(Number(infraction) + this.client.random(99)),
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
			let [guild] = await this.findBy("guilds", { id });
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
		let [user] = await this.findBy("users", { id });

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
	async increaseVotes(user: string | bigint, amount: number) {
		const id = BigInt(user);
		const votes = Number((await this.getUser(user)).votes);
		const newvotes = votes + Number(amount);

		await this.knex("users").where({ id }).update({ votes: newvotes });

		return newvotes;
	}
	guildData(id: bigint) {
		return {
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
		return guild?.prefix || this.client.settings.prefix;
	}
	async setLang(guildID: string, language: number) {
		const id = BigInt(guildID);
		let [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ language });
		} else if (!guild) {
			await this.knex("guilds").insert(this.guildData(id));
		}

		return language;
	}
	async setPrefix(guildID: string, prefix: string) {
		const id = BigInt(guildID);
		let [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ prefix });
		} else if (!guild) {
			await this.knex("guilds").insert(this.guildData(id));
		}

		return prefix;
	}
}
export interface infraction {
	when: number;
	user: BigInt;
	id: BigInt;
	guild: BigInt;
	reason: string;
	type: string;
}
export interface guildSettingsInterface {
	id: bigint;
	muterole: bigint;
	modrole: bigint;
	github: bigint;
	modlogs: bigint;
	emoji: bigint;
	starboard: bigint;
	emojicount: number;
	stickers: boolean;
	prefix: any;
	githubchannel: bigint;
	language: number;
}
/*
abstract class giveaway {
	winners: 0;
	time: 0;
	prize: "string";
	options: {
		roles: ["string"];
		messages: 0;
		joindate: 0;
	};
	channel: "string";
	message: "string";
	guildId: "string";
}
abstract class mute {
	id: "string";
	time: 0;
}
abstract class infraction {
	when: 0;
	who: "string";
	reason: "string";
	type: "string";
}
*/
