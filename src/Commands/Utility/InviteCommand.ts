import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class InviteCommand extends Command {
	public constructor() {
		super("invite", {
			aliases: ["invite"],
			category: "Utility",
			quoted: true,
			description: {
				content: "Invite malil to your server as well",
				usage: "invite",
				example: ["invite"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle(`click here to invite ${this.client.user.username} to your server`)
			.setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`)
			.setColor(this.client.consts.colors.default);

		return message.util.send({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
