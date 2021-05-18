import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";

export default class SecretCommand extends Command {
	constructor() {
		super("secret", {
			aliases: ["secret"],
			category: "Developer",
			description: {
				content: "why Would you care",
				usage: "E",
				example: ["R"],
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			channel: "guild",
		});
	}

	async exec(message: Message, { code }) {
		message.util.send("woah you found my  secret command", { allowedMentions: { repliedUser: false } });
	}
}
