import Command from "../../Classes/malilCommand";
import { Message, CommandInteraction } from "discord.js";
export default class SupportCommand extends Command {
	constructor() {
		super("support", {
			name: "support",
			slash: true,
			aliases: ["support"],
			category: "General",
			description: "",
			clientPermissions: ["SEND_MESSAGES"],
			channel: "guild",
		});
	}

	exec(message: Message): Promise<Message> {
		return message.reply("https://discord.gg/mY8zTARu4g");
	}
	execSlash(message: CommandInteraction): Promise<void> {
		return message.reply("https://discord.gg/mY8zTARu4g");
	}
}
