import { Inhibitor, Command } from "discord-akairo";
import { Message } from "discord.js";
import { superUsers } from "../Lib/config";
export default class extends Inhibitor {
	constructor() {
		super("disabledCommands", {
			reason: "disabled",
			priority: 1,
			type: "post",
		});
	}
	// prettier-ignore
	async exec(message: Message, command: Command | null | undefined ): Promise<boolean> {
		if (message.author.bot) return false;
		if(command.id == "disable") return false
		if (superUsers.includes(message.author.id)) return false;

		this.client.gp.ensure('disabledCategory', {
			[message.guild.id]: [],
		});

		/**
		 * Category stuff
		 */
		const disabledCategory: string[] = (await this.client.gp.get(
			'disabledCategory',
			message.guild.id
		)) as string[];
		if (disabledCategory.includes(command?.categoryID)) {
				this.client.logger.command(message, command, "Disabled Command");
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
				this.client.logger.command(message, command, "Disabled Command");
			message.reply(`**${command?.id}** command is disabled in this server`);
			return true;
		}
		return false;
	}
}
