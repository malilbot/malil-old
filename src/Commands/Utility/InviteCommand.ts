import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

export default class InviteCommand extends Command {
	public constructor() {
		super('invite', {
			aliases: ['invite'],
			category: 'Utility',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'array',
					match: 'rest',
				},
			],
			description: {
				content: 'Invite malil to your server aswell',
				usage: 'invite',
				example: ['invite'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			channel: 'guild',
		});
	}

	public async exec(message: Message, { args }) {
		const embed = new MessageEmbed()
			.setTitle('click here to invtite malil to your server')
			.setURL(
				'https://discord.com/oauth2/authorize?client_id=749020331187896410&scope=bot&permissions=117824'
			)
			.setColor(this.client.consts.colors.default);

		message.util.reply({
			embed: embed,
			allowedMentions: { repliedUser: false },
		});
	}
}
