import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
export default class PingCommand extends Command {
	constructor() {
		super("ping", {
			aliases: ["ping"],
			category: "General",
			description: {
				content: "PING_DESCRIPTION_CONTENT",
				example: "PING_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
			ownerOnly: false,
			ratelimit: 3,
		});
	}

	async exec(message: Message): Promise<void> {
		const beforeQueryTime = Date.now();
		await this.client.query(`SELECT 2 + 2 as result`);
		const afterQueryTime = Date.now();
		message.channel.send("pinging").then((m) => {
			const embed = this.client.util
				.embed()
				.setColor("GREEN")
				.addField("Discord latency", `${m.createdTimestamp - message.createdTimestamp || "UNLIMITED POWER!"} ms`)
				.addField("Api latency", `${Math.round(this.client.ws.ping) || "UNLIMITED POWER!"} ms`)
				.addField("Database latency", `${afterQueryTime - beforeQueryTime || "UNLIMITED POWER!"} ms`);
			m.edit(embed);
		});
	}
}
