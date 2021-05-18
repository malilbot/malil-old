import { CommandInteraction } from "discord.js";
import { Listener } from "discord-akairo";
import Command from "../../Classes/malilCommand";

export default class slashNotFoundListener extends Listener {
	constructor() {
		super("slashNotFound", {
			emitter: "commandHandler",
			event: "slashNotFound",
			category: "commands",
		});
	}

	async exec(interaction: CommandInteraction): Promise<void> {
		return interaction.reply(`**${interaction.commandName}** Was not found`, {
			ephemeral: true,
		});
	}
}
