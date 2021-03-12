import { Inhibitor, Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { main, sec, third, fourth, split } from '../lib/Utils';
import { superUsers } from '../lib/config';
const timeoutObject = {};
const blacklist = {};
export default class extends Inhibitor {
	constructor() {
		super('Autoblacklist', {
			reason: 'Autoblacklist',
			priority: 5,
			type: 'post',
		});
	}

	public async exec(message: Message): Promise<boolean> {
		if (superUsers.includes(message.author.id)) return false;
		if (blacklist[message.author.id] == true) return true;
		if (!timeoutObject[message.author.id]) {
			timeoutObject[message.author.id] = 0;
		}
		const num = timeoutObject[message.author.id];
		timeoutObject[message.author.id] = num + 1;
		setTimeout(function () {
			const num = timeoutObject[message.author.id];
			timeoutObject[message.author.id] = num - 1;
		}, 600000);
		if (num == 60) {
			this.client.logger.info(
				third(
					'[ BLACKLISTED USER ] ' +
						sec(`[ ${message.author.tag} ] [ ${message.author.id}]`)
				)
			);
			timeoutObject[message.author.id] = 0;
			blacklist[message.author.id] = true;
			message.reply(
				'You have been blacklisted for 24 hours undereview for abusing the bot, To apeal your ban do fire new in the support server https://discord.gg/mY8zTARu4g'
			);
			setTimeout(function () {
				this.client.logger.info(
					third(
						'[ UN-BLACKLISTED USER ] ' +
							sec(`[ ${message.author.tag} ] [ ${message.author.id}]`)
					)
				);
				blacklist[message.author.id] = false;
			}, 86400000);
		}
		return false;
	}
}
