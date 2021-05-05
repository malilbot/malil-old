import { MessageEmbed, Message, TextChannel, Interaction } from "discord.js";
import { Listener } from "discord-akairo";
import { stripIndents } from "common-tags";
import Command from "../../Classes/malilCommand";
import { hst, Format, a1, sLog } from "../../Lib/Utils";

export default class CommandErrorListener extends Listener {
	public constructor() {
		super("slashError", {
			emitter: "commandHandler",
			event: "slashError",
			category: "commands",
		});
	}

	public async exec(error: Error, message: Message, command: Command | null | undefined): Promise<void> {
		console.log(error);
	}
}
