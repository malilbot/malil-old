/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MalilListener } from "../../Classes/MalilListener";
import { readyLog } from "../../Lib/Utils";
import { join } from "path";
import { TextChannel } from "discord.js";
import { CronJob } from "cron";
import { readFileSync, writeFileSync } from "fs";
export default class Ready extends MalilListener {
	constructor() {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
	}
	async exec(): Promise<void> {
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
