import Command from "../../Classes/malilCommand";
import { CommandInteraction, Message } from "discord.js";
export default class PingCommand extends Command {
	constructor() {
		super("ping", {
			aliases: ["ping"],
			category: "General",
			description: {
				content: "Sends the latency between discord and the bot",
				example: ["ping"],
			},
			clientPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
			ownerOnly: false,
			ratelimit: 3,
		});
	}

	exec(message: Message): void {
		message.channel.send("pinging").then((m) => {
			m.edit(`🏓Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ws.ping)}ms`);
		});
	}
}
