import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
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
			slash: true,
			description: {
				content: "LANGUAGE_DESCRIPTION_CONTENT",
				example: "LANGUAGE_DESCRIPTION_EXAMPLE",
			},
			options: [
				{
					type: 3,
					name: "language",
					description: "the language you want to change malil to",
					required: true,
					choices: [
						{
							name: "en",
							value: "en",
						},
						{
							name: "owo",
							value: "owo",
						},
					],
				},
			],
			args: [
				{
					id: "language",
					type: "string",
					match: "rest",
				},
			],
			clientPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
			ownerOnly: false,
			ratelimit: 2,
			cooldown: 5000,
		});
	}

	async exec(message: Message, { language }: { language: string }): Promise<Message | boolean> {
		const settings = await this.client.getGuildSettings(message.guild.id);

		if (["en", "owo"].includes(language)) {
			if (!message.member.permissions.has("MANAGE_ROLES")) return this.handler.emit("missingPermissions", message, this, "client", ["MANAGE_ROLES"]);
			await this.client.setLang(message.guild.id, <number>langfromnum(language));
			await this.client.regSlash({ guild: message.guild.id, language: langfromnum(language) as number });
			return this.client.get(message, "CHANGED_LANGUAGE", this.client.user.username, language);
		} else return this.client.get(message, "CURRENT_LANGUAGE", langfromnum(settings.language) as string, ["en", "owo"]);
	}
}
