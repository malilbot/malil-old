import { Command } from 'discord-akairo';
import { MessageEmbed, Message, GuildMember } from 'discord.js';
import { GetMember } from '../../lib/Utils';
export default class PpCommand extends Command {
	public constructor() {
		super('pp', {
			aliases: ['pp'],
			category: 'Fun',
			quoted: true,
			args: [
				{
					id: 'member',
					type: 'member',
					match: 'rest',
					default: (msg: Message) => msg.member,
				},
			],
			description: {
				content: 'pp command',
				usage: 'pp',
				example: ['pp @someone'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			channel: 'guild',
		});
	}

	public async exec(message: Message, {}) {
		const member: GuildMember =
			(await GetMember(message)) || message.member;
		let pp;
		const id = member.id;
		this.client.UserData.ensure(member.id, {
			pp: '',
			iq: 0,
		});

		if (this.client.UserData.get(id, 'pp')) {
			pp = this.client.UserData.get(id, 'pp');
		} else {
			const phrases = [
				'ur a women',
				'8D Smoll',
				'8=D',
				'8==D',
				'8===D',
				'8====D',
				'8=====D Average Sizer',
				'8======D',
				'8=======D',
				'8========D',
				'8=========D',
				'8==========D BBC Right Here',
			];
			pp = phrases[Math.floor(Math.random() * phrases.length)];
			this.client.UserData.set(id, pp, 'pp');
		}
		const embed = new MessageEmbed()
			.setTitle(`Penis Calculator`)
			.setDescription(`${pp}\n\n${member}'s Penis Size.`)
			.setColor(this.client.consts.colors.default);
		message.util.send(embed);
	}
}
