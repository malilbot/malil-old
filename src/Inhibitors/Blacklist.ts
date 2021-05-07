import { Inhibitor, Command } from "discord-akairo";
import { Message } from "discord.js";
export default class extends Inhibitor {
	constructor() {
		super("blacklist", {
			reason: "blacklist",
			type: "post",
		});
	}

	exec(message: Message, command: Command): boolean {
		if (this.client.blacklist.get("blacklisted", "list").includes(message.author.id) == true) {
			this.client.logger.command(message, command, "Stopped");
			return true;
		}
	}
}
