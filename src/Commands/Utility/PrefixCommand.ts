import { Command } from 'discord-akairo';
import type { Message } from 'discord.js';
export default class PrefixCommand extends Command {
	public constructor() {
		super('prefix', {
			aliases: ['prefix'],
			category: 'Utility',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'string',
					match: 'rest',
				},
			],
			description: {
				content: 'Find your 8ball',
				usage: 'prefix',
				example: ['prefix'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			channel: 'guild',
		});
	}

	public async exec(message: Message, { args }) {
		if (!args || args.length == 0 || args.size == 0) {
			if (this.client.prefixes.get(message.guild.id, 'prefix')) {
				const item = this.client.prefixes.get(message.guild.id, 'prefix');
				if (item) return message.channel.send('my prefix is ' + item);
			} else return message.channel.send('my prefix is *');
		} else {
			if (!message.member.permissions.has('ADMINISTRATOR'))
				return message.channel.send(
					"you need to be a 'ADMINISTRATOR' to use this command"
				);
			else if (args.includes('@'))
				return message.reply("Sorry you cant use @'s in prefixes");
			this.client.prefixes.set(message.guild.id, args, 'prefix');
			message.channel.send('Updated the prefix to ' + args);
		}
	}
}
