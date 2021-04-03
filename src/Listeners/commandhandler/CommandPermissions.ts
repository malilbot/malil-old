import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";
import { a1, Format } from "../../lib/Utils";
import Client from "../../classes/Client";
export default class missingPermissions extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("missingPermissions", {
			emitter: "commandHandler",
			event: "missingPermissions",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command, type: string, missing: string[]): void {
		let tp: string;

		if (missing.includes("SEND_MESSAGES")) return;
		const { GStr, UStr, MStr, CStr } = Format(message, command, missing, type);
		if (type == "user") tp = `user doesnt have ${MStr} permissions`;
		else tp = `i dont have ${MStr} permissions`;
		this.client.logger.info(a1(`[ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr} [ COULD NOT RUN CAUSE ] ${tp}`));
		const perm = missing[0].toLowerCase().replace(/_/g, " ");
		if (type == "user") {
			message.util.send(`You dont have the **${perm}** permission to execute this command`);
		} else {
			message.util.send(`i dont have the **${perm}** permission to execute this command`);
		}
	}
}
