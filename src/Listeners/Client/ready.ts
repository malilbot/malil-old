import { Listener } from "discord-akairo";
import Client from "../../Classes/Client";
import { readyLog } from "../../Lib/Utils";
//import cron from "node-cron";
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
		//new cron("0 0 0 * * *", async () => {});
		api(this.client as any);
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
