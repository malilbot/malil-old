import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, CommandInteraction } from "discord.js";

export default class InviteCommand extends Command {
	constructor() {
		super("invite", {
			aliases: ["invite"],
			category: "Utility",
			quoted: true,
			description: {
				content: "INVITE_DESCRIPTION_CONTENT",
				example: "INVITE_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle(`click here to invite ${this.client.user.username} to your server`)
			.setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`)
			.setColor(this.client.colors.default);

		return message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
	async execSlash(message: CommandInteraction) {
		message.reply("https://malilbot.github.io/invite");
	}
}
