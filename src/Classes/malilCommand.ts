import { Command as AkairoCommand } from "discord-akairo";
import type { CommandOptions as AkairoModuleOptions } from "discord-akairo";
import type { ApplicationCommandOptionChoice } from "discord.js";

interface ApplicationCommandOption {
	type: number;
	name: string;
	description: string;
	required?: boolean;
	choices?: ApplicationCommandOptionChoice[];
}

interface CommandOptions extends AkairoModuleOptions {
	name?: string;
	description: string | any;
	options?: ApplicationCommandOption[];
	ownerOnly?: boolean;
}

export default abstract class Command extends AkairoCommand {
	constructor(id: string, options: CommandOptions) {
		super(id, options);
		this.options = {
			options: options.options,
		};
	}
}
