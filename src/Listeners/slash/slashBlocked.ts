import { CommandInteraction } from "discord.js";
import { Listener } from "discord-akairo";
import Command from "../../Classes/malilCommand";

export default class slashBlockedListener extends Listener {
	constructor() {
		super("slashBlocked", {
			emitter: "commandHandler",
			event: "slashBlocked",
			category: "commands",
		});
	}

	async exec(interaction: CommandInteraction): Promise<void> {
		return interaction.reply(`**${interaction.commandName}** Is owner only`, {
			ephemeral: true,
		});
	}
}
