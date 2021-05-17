/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Listener } from "discord-akairo";
import Client from "../../Classes/Client";
import { readyLog } from "../../Lib/Utils";
import { join } from "path";
import { TextChannel } from "discord.js";
import { CronJob } from "cron";
import { readFileSync, writeFileSync } from "fs";
import api from "../../Classes/api";
export default class Ready extends Listener {
	public constructor(client: Client) {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}
	public async exec(): Promise<void> {
		api();
		new CronJob("0 0 0 * * *", async () => {
			const jsonString = readFileSync(join(__dirname, "..", "..", "..", "data", "stats.json"), "utf8");
			const regusers = (await this.client.db.knex("users")).length;
			const regguilds = (await this.client.db.knex("guilds")).length;
			const infractions = (await this.client.db.knex("infractions")).length;

			const customer = JSON.parse(jsonString);

			const guilds = this.client.guilds.cache.size;
			const channels = this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0);
			const members = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
			const commands = this.client.commandHandler.modules.size;
			//@ts-ignore
			const listeners = this.client.listenerHandler.modules.size;
			//@ts-ignore
			const inhibitors = this.client.inhibitorHandler.modules.size;
			const rawmessages = this.client.channels.cache.map((c) => {
				if (c.type == "text") return (c as TextChannel).messages.cache.map(() => 1);
				else return [0];
			});
			const messagesRaw = [].concat([], ...rawmessages);
			let messages = 0;
			for (let index = 0; index < messagesRaw.length; index++) {
				messages = messages + messagesRaw[index];
			}
			customer.guilds.push(guilds);
			customer.channels.push(channels);
			customer.users.push(members);
			customer.commands.push(commands);
			customer.listeners.push(listeners);
			customer.inhibitors.push(inhibitors);
			customer.messages.push(messages);
			customer.regusers.push(regusers);
			customer.regguilds.push(regguilds);
			customer.infractions.push(infractions);
			writeFileSync(join(__dirname, "..", "..", "..", "data", "stats.json"), JSON.stringify(customer));
		});

		if (this.client.settings.dev) {
			const guild = this.client.guilds.cache.get(this.client.consts.testserver) || (await this.client.guilds.fetch(this.client.consts.testserver));
			const enabled = await guild.commands.fetch();
			for (const command of enabled) {
				if (!this.client.commandHandler.modules.find((cmd) => cmd.id == command[1].name)) {
					await guild.commands.delete(command[1].id);
					console.log("deleted", command[1].name);
				}
			}

			for (let cmd of this.client.commandHandler.modules) {
				if (cmd[1].execSlash) {
					const found = enabled.find((i) => i.name == cmd[1].id);

					const slashdata = {
						name: cmd[1].id,
						description: cmd[1].description.content,
						options: cmd[1].options.options,
					};

					if (found?.id) {
						if (slashdata.description !== found.description) {
							await guild.commands.edit(found.id, slashdata);
						} else {
							continue;
						}
					} else {
						console.log("enabled", cmd[1].id);
						await guild.commands.create(slashdata);
					}
				}
			}
		}

		if (this.client?.shard?.ids[0] == this.client.options.shardCount - 1 && this.client.shard.ids[0] !== 0) {
			this.client.logger.info("[ MAXSHARDS ]");
			return;
		}
		if (this.client?.shard?.ids[0] !== 0) return;
		const totalGuilds = await this.client.shard.fetchClientValues("guilds.cache.size").then((serv) => serv.reduce((acc, guildCount) => acc + guildCount, 0));
		// prettier-ignore
		const totalMembers = await this.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then(member => member.reduce((acc, memberCount) => acc + memberCount, 0))

		this.client.emit("startServer", totalGuilds, totalMembers);

		return readyLog(this.client);
	}
}
