import { Command } from "discord-akairo";
import { Message } from "discord.js";
export default class PingCommand extends Command {
	public constructor() {
		super("ping", {
			aliases: ["ping"],
			category: "General",
			description: {
				content: "Sends the latency between discord and the bot",
				example: ["ping"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			ratelimit: 3,
		});
	}

	public exec(message: Message): void {
		message.util.send(`\`${this.client.ws.ping}\`ms`);
	}
}
