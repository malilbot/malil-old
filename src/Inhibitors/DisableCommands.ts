import { Inhibitor, Command } from "discord-akairo";
import { Message } from "discord.js";
import { superUsers } from "../Lib/config";
import { Format, a1 } from "../Lib/Utils";
export default class extends Inhibitor {
	constructor() {
		super("disabledCommands", {
			reason: "disabled",
			priority: 1,
			type: "post",
		});
	}
	// prettier-ignore
	public async exec(message: Message, command: Command | null | undefined ): Promise<boolean> {
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
			const { GStr, UStr, CStr } = Format(message, command, null, null);
			this.client.logger.info(a1(`[ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr} [ COMMAND STOPPED ] reason: disabled in server`));
			message.util.send(
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
			const { GStr, UStr, CStr } = Format(message, command, null, null);
			this.client.logger.info(a1(`[ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr} [ COMMAND STOPPED ] reason: disabled in server`));
			message.util.send(`**${command?.id}** command is disabled in this server`);
			return true;
		}
		return false;
	}
}
