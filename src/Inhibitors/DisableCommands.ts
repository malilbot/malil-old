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
        
        if(message.author.bot) return false
        this.client.gp.ensure('disabledCommands', {
					[message.guild.id]: [],
				});
		//if (superUsers.includes(message.author.id)) return false;
        console.log(command?.id);
		const disabledCommands: string[] = (await this.client.gp.get(
			'disabledCommands', message.guild.id
		)) as string[];
        console.log(disabledCommands);
		if (disabledCommands.includes(command?.id)) {
			return true;
		}
		return false;
	}
}
