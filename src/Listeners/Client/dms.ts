import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
const talkedRecently = new Set();
import Client from '../../lib/Client';
import { main, sec, third, fourth, a1, split } from '../../lib/Utils';
import alexa from 'alexa-bot-api';
const ai = new alexa();
export default class message extends Listener {
	client: Client;
	public constructor(client: Client) {
		super('message', {
			emitter: 'client',
			event: 'message',
			category: 'client',
		});
		this.client = client;
	}

	async exec(message: Message) {
		if (message.content.includes('malil')) {
			if (!message.author.bot) {
				this.client.logger.info(
					`${main('[ MALIL MENTIONED ]')}${third('[AUTHOR]')} ${
						message.author.tag
					} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`
				);
			}
		}
		if (message.content.includes('tricked')) {
			if (!message.author.bot) {
				this.client.logger.info(
					`${main('[ MALIL MENTIONED ]')}${third('[AUTHOR]')} ${
						message.author.tag
					} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`
				);
			}
		}
		if (this.client.gp.get('shitpost').includes(message?.channel?.id)) {
			if (!message.author.bot) {
				if (!talkedRecently.has(message.author.id)) {
					if (message.content[0] !== '#') {
						console.log(`[ MSG ${message.author.tag} ] ${message.content}`);
						const reply = await ai.getReply(
							message.content || 'OOOOGAAA BOOGA'
						);
						console.log(`[ ${message.guild.name} ][ REPLY ] ${reply}`);
						message.reply(reply, { allowedMentions: { repliedUser: false } });
					}
					talkedRecently.add(message.author.id);
					setTimeout(() => {
						talkedRecently.delete(message.author.id);
					}, 2000);
				}
			}
			if (message.author.bot) return;
			if (message.guild !== null) return;
			this.client.logger.info(
				`${main('[ DM ]')}${third('[AUTHOR]')} ${message.author.tag} (${
					message.author.id
				}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`
			);
		}
	}
}
