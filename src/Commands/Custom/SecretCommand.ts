import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";

export default class SecretCommand extends Command {
	constructor() {
		super("secret", {
			aliases: ["secret"],
			category: "Developer",
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			channel: "guild",
		});
	}

	exec(message: Message): Promise<Message> {
		return message.reply("woah you found my  secret command", { allowedMentions: { repliedUser: false } });
	}
}
