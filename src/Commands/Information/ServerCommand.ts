import { Command } from 'discord-akairo';
import type {
	Message,
	GuildMember,
	ImageSize,
	AllowedImageFormat,
} from 'discord.js';
import { MessageEmbed } from 'discord.js';

export default class ServerCommand extends Command {
	public constructor() {
		super('server', {
			aliases: ['server'],
			category: 'Info',
			quoted: true,
			description: {
				content: 'Get some info about the discord server',
				usage: 'server',
				example: ['server'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 1,
			channel: 'guild',
		});
	}

	public async exec(message: Message) {
		const embed = new MessageEmbed()
			.setColor(this.client.consts.colors.orange)
			.setTitle('Server Info')
			.setDescription(`${message.guild}'s information`)
			.addField('Owner', `The owner of this server is ${message.guild.owner}`)
			.addField(
				'Member Count',
				`This server has ${message.guild.memberCount} members`
			)
			.addField(
				'Emoji Count',
				`This server has ${message.guild.emojis.cache.size} emojis`
			)
			.addField(
				'Roles Count',
				`This server has ${message.guild.roles.cache.size} roles`
			)
			.addField(
				'Chanel Count',
				`This server has ${message.guild.channels.cache.size} channels`
			);

		message.util.send(embed);
	}
}
