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
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			userPermissions: ["MANAGE_ROLES"],
			clientPermissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
			ownerOnly: false,
			ratelimit: 2,
			cooldown: 5000,
		});
	}

	async exec(message: Message, { args }: { args: string }): Promise<Message> {
		const settings = await this.client.getGuildSettings(message.guild.id);

		if (["en", "owo"].includes(args)) {
			await this.client.setLang(message.guild.id, <number>langfromnum(args));
			await this.client.regSlash({ guild: message.guild.id, language: langfromnum(args) as number });
			message.reply(`Changed my language to ${args}`);
		} else return message.reply(`My current language is **${langfromnum(settings.language)}**, you can choose from \`owo\` and \`en\``);
	}
	async execSlash(interaction: CommandInteraction, { language }): Promise<void> {
		await this.client.setLang(interaction.guild.id, <number>langfromnum(language.value));
		await this.client.regSlash({ guild: interaction.guild.id, language: langfromnum(language.value) as number });
		return interaction.reply(`Changed my language to ${language.value}`);
	}
}
