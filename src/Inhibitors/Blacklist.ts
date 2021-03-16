import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js";
import { a1, Format } from "../lib/Utils";
export default class extends Inhibitor {
	constructor() {
		super("blacklist", {
			reason: "blacklist",
			type: "all",
		});
	}

	exec(message: Message): boolean {
		if (
			this.client.blacklist.get("blacklisted", "list").includes(message.author.id) &&
			(message.author.id !== "336465356304678913") == true
		) {
			const { GStr, UStr } = Format(message, null, null, null);
			this.client.logger.info(a1(`[ USER ] ${UStr} [ GUILD ] ${GStr} [ REJECTED FOR BEING BLACKLISTED ]`));
			return true;
		}
	}
}
