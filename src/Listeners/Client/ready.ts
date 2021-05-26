/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MalilListener } from "../../Classes/MalilListener";
import { readyLog } from "../../Lib/Utils";
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

		const totalMembers = await this.client.shard
			.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)")
			.then((member) => member.reduce((acc, memberCount) => acc + memberCount, 0));
		const userEmbed = this.client.util
			.embed()
			.addField(
				"Logged in as ᗙ",
				`**UserName:** ${this.client.user.username}\n**Id:** ${this.client.user.id}\n**FullName:** ${this.client.user.tag}\n**Invite:** [https://discord.com/oath2 etc etc](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands)\n**website:** https://malilbot.github.io`
			)
			.setColor("GREEN");
		const embed = this.client.util.embed().addField("Logged in ᗙ", `**guilds:** ${totalGuilds}\n**Members:** ${totalMembers}`).setColor(this.client.colors.blue);
		if (this.client.user.id !== "826480286169956413") this.client.webhook.send({ embeds: [userEmbed, embed] });
		return readyLog(this.client);
	}
}
