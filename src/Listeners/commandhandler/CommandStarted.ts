import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";
import Client from "../../Classes/Client";

export default class CommandStarted extends Listener {
	constructor(client: Client) {
		super("commandStarted", {
			emitter: "commandHandler",
			event: "commandStarted",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command): void {
		const cur = this.client.gp.ensure("run", 1, `${command}`);
		this.client.gp.set("run", cur + 1, `${command}`);
		this.client.gp.math("commands", "+", 1);
		this.client.logger.command(message, command, "Started");
	}
}
