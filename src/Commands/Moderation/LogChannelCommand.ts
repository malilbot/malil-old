import { Command } from 'discord-akairo';
import { MessageEmbed, Message, GuildChannel } from 'discord.js';

export default class LogChannelCommand extends Command {
	public constructor() {
		super('logchannel', {
			aliases: ['logchannel', 'modlogs'],
			category: 'Moderation',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'array',
					match: 'rest',
				},
			],
			description: {
				content:
					'A way to log all actions in the Moderation catagory requires manage server permissions to use',
				usage: 'logchannel',
				example: [
					'logchannel',
					'logchannel set #channel',
					'logchannel set <channel id>',
					'logchannel get',
				],
			},
			ratelimit: 3,
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['MANAGE_CHANNELS'],
			channel: 'guild',
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		let split: string;
		if (
			args &&
			args.replace(/</, '') &&
			args.replace(/</, '') &&
			args.replace(/</, '').replace(/#/, '').replace(/>/, '')
		)
			args = args.replace(/</, '').replace(/#/, '').replace(/>/, '');

		// eslint-disable-next-line no-empty
		if (!args) {
		} else split = args.split(' ');

		this.client.logchannel.ensure(message.guild.id, '');
		const logchannel = (await this.client.logchannel.get(message.guild.id))
			? await this.client.logchannel.get(message.guild.id)
			: 'none';

		if (!split || !split[0] || split[0] == 'get') {
			if (logchannel !== 'none') {
				const cnl = await this.client.channels.fetch(logchannel);
				const embed = new MessageEmbed()
					.addField(
						'logs',
						'The current log channel is ' + (cnl as GuildChannel).name ||
							'`Channel missing or deleted`'
					)
					.setColor(this.client.consts.colors.default)
					.setFooter('if it shows a id just assume it works');
				message.util.send(embed);
			} else
				message.reply('no log channel set yet use @malil set < channel id >');
		} else if (split[0] == 'set') {
			const channel = this.client.channels.fetch(split[1]);
			if (!channel)
				message.reply(
					new MessageEmbed()
						.addField(
							'not found',
							'the channel was not found please enter a valid channel'
						)
						.setColor(this.client.consts.colors.default)
				);
			else {
				const embed = new MessageEmbed()
					.addField('logs', 'alright set the log channel to ' + (await channel))
					.setFooter('if it shows a id just assume it works')
					.setColor(this.client.consts.colors.default);
				message.util.send(embed);
				this.client.logchannel.set(message.guild.id, split[1]);
			}
		} else {
			message.util.send('Use `@malil help logchannel` for more info', {
				allowedMentions: { repliedUser: false },
			});
		}
	}
}
