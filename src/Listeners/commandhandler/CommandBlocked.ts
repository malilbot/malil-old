import { Listener, Command } from "discord-akairo";
import { Format } from "../../lib/util";
import Client from "../../lib/Client";
import { Message } from "discord.js";
import { a1 } from "../../lib/Utils";
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
		const { GStr, UStr, RStr, CStr } = Format(message, command, null, reason);
		this.client.logger.info(a1(`[ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr} [ BLOCKED FOR ] ${RStr}`));
		if (reason == "owner") {
			message.react("812398880515817472");
		}
	}
}
