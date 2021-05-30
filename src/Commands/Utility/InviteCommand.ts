import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, CommandInteraction } from "discord.js";

export default class InviteCommand extends Command {
	constructor() {
		super("invite", {
			aliases: ["invite"],
			category: "Utility",
			quoted: true,
			slash: true,
			description: {
				content: "INVITE_DESCRIPTION_CONTENT",
				example: "INVITE_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	exec(message: Message): Promise<Message> {
		return message.reply(
			`Invite ${this.client.user.username} to your server\n<https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands>`
		);
	}
}
