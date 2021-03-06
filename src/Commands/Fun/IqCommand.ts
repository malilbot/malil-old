import { Command } from 'discord-akairo';
import type {
	Message,
	GuildMember,
	ImageSize,
	AllowedImageFormat,
} from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { GetSelf } from '../../lib/Utils';

export default class IqCommand extends Command {
	public constructor() {
		super('iq', {
			aliases: ['iq', 'smart'],
			category: 'Fun',
			args: [
				{
					id: 'member',
					type: 'member',
					match: 'rest',
				},
			],
			description: {
				content: 'Find your iq',
				usage: 'iq',
				example: ['iq'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
		});
	}

	public async exec(message: Message, {}) {
		const member: GuildMember =
			(await GetSelf(message, this.client)) || message.member;
		let iq;
		this.client.UserData.ensure(member.id, {
			pp: '',
			iq: 0,
		});
		if (this.client.UserData.get(member.id, 'iq')) {
			iq = this.client.UserData.get(member.id, 'iq');
		} else {
			iq = Math.floor(Math.random() * 150) + 1;
			this.client.UserData.set(member.id, iq, 'iq');
		}
		const iEmbed = new MessageEmbed()
			.setColor(this.client.consts.colors.default)
			.setTitle('IQ Test')
			.setDescription(`${member}'s IQ is: \`${iq}\`!`);
		message.util.send(iEmbed);
	}
}
