import { Listener, Command } from "discord-akairo";
import Client from "../../Classes/Client";
import { Message } from "discord.js";
export default class commandBlocked extends Listener {
	public constructor(client: Client) {
		super("commandBlocked", {
			emitter: "commandHandler",
			event: "commandBlocked",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command, reason: string): void {
		this.client.logger.command(message, command, "Blocked");

		if (reason == "owner") {
			message.react("812398880515817472").catch(() => {});
		}
	}
}
