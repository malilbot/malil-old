import { Listener, Command } from "discord-akairo";
import { sLog } from "../../lib/util";
import Client from "../../classes/Client";
import { Message } from "discord.js";
import {} from "../../lib/Utils";
export default class commandBlocked extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("commandBlocked", {
			emitter: "commandHandler",
			event: "commandBlocked",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command, reason: string): void {
		sLog({ msg: message, command, type: reason });
		if (reason == "owner") {
			message.react("812398880515817472");
		}
	}
}
