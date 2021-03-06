import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class DisableCommand extends Command {
	public constructor() {
		super('disable', {
			aliases: ['disable', 'enable'],
			category: 'config',
			description: {
				content: 'A command to disable/enable commands.',
				usage: 'disable|enable <command>',
				examples: ['disable ban', 'enable ban'],
			},
			args: [
				{
					id: 'cmd',
					type: 'commandAlias',
					match: 'content',
				},
			],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['MANAGE_GUILD'],
		});
	}
	public async exec(
		message: Message,
		{ cmd }: { cmd: Command }
	): Promise<Message> {
		const db = this.client.gp;
		db.ensure('disabledCommands', {
			[message.guild.id]: [],
		});
		if (!cmd) return message.reply('Please mention a command');
		if (cmd.id == 'disable')
			return await message.util.reply(`You cannot disable ${cmd.aliases[0]}.`);
		let action: string;
		const disabledCommands: string[] = (await db.get(
			'disabledCommands',
			message.guild.id
		)) as string[];

		if (disabledCommands.includes(cmd.id)) {
			disabledCommands.splice(disabledCommands.indexOf(cmd.id), 1);
			db.set('disabledCommands', disabledCommands, message.guild.id);
			action = 'enabled';
		} else {
			disabledCommands.push(cmd.id);
			db.set('disabledCommands', disabledCommands, message.guild.id);
			action = 'disabled';
		}
		return await message.channel.send(
			`${action} command **${cmd.aliases[0]}**`
		);
	}
}
