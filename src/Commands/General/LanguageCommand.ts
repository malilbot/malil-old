import Command from "../../Classes/malilCommand";
import { CommandInteraction, Message } from "discord.js";
const langfromnum = (num: number | string) => {
	if (num == 1) return "en";
	if (num == 2) return "owo";
	if (num == "en") return 1;
	if (num == "owo") return 2;
};
export default class languageCommand extends Command {
	constructor() {
		super("language", {
			aliases: ["language", "lang"],
			category: "General",
			description: {
				content: "LANGUAGE_DESCRIPTION_CONTENT",
				example: "LANGUAGE_DESCRIPTION_EXAMPLE",
			},
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			userPermissions: ["MANAGE_ROLES"],
			clientPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
			ownerOnly: false,
			ratelimit: 3,
		});
	}

	async exec(message: Message, { args }): Promise<Message> {
		const settings = await this.client.db.getGuildSettings(message.guild.id);

		if (["en", "owo"].includes(args)) {
			this.client.db.setLang(message.guild.id, <number>langfromnum(args));
			message.reply(`Changed my language to ${args}`);
		} else return message.reply(`My current language is **${langfromnum(settings.language)}**, you can choose from \`owo\` and \`en\``);
	}
}
