import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";

export default class SecretCommand extends Command {
	constructor() {
		super("secret", {
			aliases: ["secret"],
			category: "Developer",
			description: {
				content: "NO",
				example: "NO",
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			channel: "guild",
		});
	}

	exec(message: Message): Promise<Message> {
		return message.util.send("woah you found my  secret command", { allowedMentions: { repliedUser: false } });
	}
}
