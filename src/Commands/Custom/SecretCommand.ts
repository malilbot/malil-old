import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class SecretCommand extends Command {
	public constructor() {
		super("secret", {
			aliases: [
				"Custom"
			],
			category: "Developer",
			description: {
				content: "why Would you care",
				usage: "E",
				example: [
					"R"
				]
			},
			ratelimit: 3,
			ownerOnly: false,
			channel: "guild"
		});
	}

	public async secret(message: Message, { code }) {
		message.reply("woah you found my  secret command");
	}
}
