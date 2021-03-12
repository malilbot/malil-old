import { Inhibitor, Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { superUsers } from '../lib/config';
export default class extends Inhibitor {
	constructor() {
		super('disabledCommands', {
			reason: 'disabled',
			priority: 1,
			type: 'post',
		});
	}
	// prettier-ignore
	public async exec(message: Message, command: Command | null | undefined ): Promise<boolean> {
		if (message.author.bot) return false;
		if (superUsers.includes(message.author.id)) return false;

		

		/**
		 * Category stuff
		 */
		const disabledCategory: string[] = (await this.client.gp.get(
			'disabledCategory',
			message.guild.id
		)) as string[];
		if (disabledCategory.includes(command?.categoryID)) {
			message.reply(
				`**${command?.categoryID}** Commands are disabled in this server`
			);
			return true;
		}
		/**
		 * Commands stuff
		 */
		this.client.gp.ensure('disabledCommands', {
			[message.guild.id]: [],
		});
		const disabledCommands: string[] = (await this.client.gp.get(
			'disabledCommands',
			message.guild.id
		)) as string[];
		if (disabledCommands.includes(command?.id)) {
			message.reply(`**${command?.id}** command is disabled in this server`);
			return true;
		}
		return false;
	}
}
