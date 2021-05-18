import { Interaction } from "discord.js";
import { Listener } from "discord-akairo";
import Command from "../../Classes/malilCommand";

export default class CommandErrorListener extends Listener {
	constructor() {
		super("slashError", {
			emitter: "commandHandler",
			event: "slashError",
			category: "commands",
		});
	}

	async exec(error: Error, message: Interaction, command: Command | null | undefined): Promise<void> {
		console.log(Interaction);
		console.log(error);
	}
}
