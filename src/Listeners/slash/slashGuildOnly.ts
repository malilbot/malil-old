import { CommandInteraction } from "discord.js";
import { Listener } from "discord-akairo";

export default class slashGuildOnlyListener extends Listener {
	constructor() {
		super("slashGuildOnly", {
			emitter: "commandHandler",
			event: "slashGuildOnly",
			category: "commands",
		});
	}

	exec(interaction: CommandInteraction): Promise<void> {
		return interaction.reply("Slash Commands dont work in dms", {
			ephemeral: true,
		});
	}
}
