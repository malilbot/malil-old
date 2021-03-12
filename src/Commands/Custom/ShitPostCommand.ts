import { Command } from 'discord-akairo';
import { MessageEmbed, Message, TextChannel } from 'discord.js';

export default class ShitPostCommand extends Command {
	public constructor() {
		super('shitPost', {
			aliases: ['shitPost'],
			category: 'Custom',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'array',
					match: 'rest',
				},
			],
			description: {
				content: '',
				usage: 'shitPost',
				example: ['shitPost'],
			},
			ownerOnly: true,
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			channel: 'guild',
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		if (!args) {
			let list = '';
			const arr = this.client.gp.get('shitpost');
			console.log(arr);
			await arr.forEach(async (item: string) => {
				console.log(item);

				const name = ((await this.client.channels.fetch(item)) as TextChannel)
					.name;

				console.log(name);
				console.log(list);
				list += `${name}\n`;
			});

			return message.reply(list || 'nothing......');
		}
		args = args.replace(/\</, '').replace(/\>/, '').replace(/\#/, '');
		const name = ((await this.client.channels.fetch(args)) as TextChannel).name;
		if (this.client.gp.get('shitpost').includes(args)) {
			const arr = this.client.gp.get('shitpost');
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == args) {
					arr.splice(i, 1);
				}
			}

			this.client.gp.set('shitpost', arr);
			return message.reply(`Removed ${name} from shitpost list`);
		}

		this.client.gp.push('shitpost', args);
		message.reply(`Added ${name} to shitpost list`);
	}
}
