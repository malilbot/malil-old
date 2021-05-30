import { Command as AkairoCommand } from "discord-akairo";
import type { CommandOptions as AkairoModuleOptions } from "discord-akairo";
import type { ApplicationCommandOptionChoice } from "discord.js";
import BotClient from "./Client";
interface ApplicationCommandOption {
	type: number;
	name: string;
	description: string;
	required?: boolean;
	choices?: ApplicationCommandOptionChoice[];
}

interface CommandOptions extends AkairoModuleOptions {
	slash?: boolean;
	name?: string;
	description?: string | any | undefined;
	options?: ApplicationCommandOption[];
	ownerOnly?: boolean;
}

export default abstract class Command extends AkairoCommand {
	public client = super.client as BotClient;
	constructor(id: string, options: CommandOptions) {
		super(id, options);
		this.options = {
			options: options.options,
		};
	}
}
