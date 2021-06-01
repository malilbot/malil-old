import { Command } from "discord-akairo";
import { MalilListener } from "../../Classes/MalilListener";
import { Message } from "discord.js";
import Client from "../../Classes/Client";
export default class missingPermissions extends MalilListener {
	constructor() {
		super("missingPermissions", {
			emitter: "commandHandler",
			event: "missingPermissions",
			category: "commandHandler",
		});
	}

	exec(message: Message, command: Command, type: string, missing: string[]): void {
		if (missing.includes("SEND_MESSAGES")) return;
		this.client.logger.command(message, command, "Missing perms");
		let perm = missing[0].toLowerCase().replace(/_/g, " ");
		perm = perm[0].toUpperCase() + perm.slice(1);
		if (type == "user") {
			this.client.get(message, "NO_PERMS_USER", perm);
		} else {
			this.client.get(message, "NO_PERMS_CLIENT", perm);
		}
	}
}
