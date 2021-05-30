import { CommandInteraction } from "discord.js";
import { Listener } from "discord-akairo";

export default class slashNotFoundListener extends Listener {
	constructor() {
		super("slashNotFound", {
			emitter: "commandHandler",
			event: "slashNotFound",
			category: "commands",
		});
	}

	exec(interaction: CommandInteraction): Promise<void> {
		return interaction.reply(`**${interaction.commandName}** Was not found`, {
			ephemeral: true,
		});
	}
}
