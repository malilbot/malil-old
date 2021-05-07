import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";
import Client from "../../Classes/Client";
export default class missingPermissions extends Listener {
	public constructor(client: Client) {
		super("missingPermissions", {
			emitter: "commandHandler",
			event: "missingPermissions",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command, type: string, missing: string[]): void {
		if (missing.includes("SEND_MESSAGES")) return;
		this.client.logger.command(message, command, "Missing perms");
		const perm = missing[0].toLowerCase().replace(/_/g, " ");
		if (type == "user") {
			message.util.send(`You dont have the **${perm}** permission to execute this command`);
		} else {
			message.util.send(`i dont have the **${perm}** permission to execute this command`);
		}
	}
}
