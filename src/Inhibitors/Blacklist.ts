import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
export default class extends Inhibitor {
	constructor() {
		super('blacklist', {
			reason: 'blacklist',
			type: 'all',
		});
	}

	exec(message: Message) {
		return (
			this.client.blacklist
				.get('blacklisted', 'list')
				.includes(message.author.id) &&
			message.author.id !== '336465356304678913'
		);
	}
}
