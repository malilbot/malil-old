import { Inhibitor, Command } from "discord-akairo";
import { Message } from "discord.js";
import { superUsers } from "../Lib/config";
export default class extends Inhibitor {
	constructor() {
		super("ModOnly", {
			reason: "ModOnly",
			priority: 7,
			type: "post",
		});
	}
	async exec(message: Message, command: Command): Promise<boolean> {
		if (superUsers.includes(message.author.id)) return false;
		if (message.member.permissions.has("MANAGE_MESSAGES")) return false;

		const channels = this.client.guilddata.ensure(message.guild.id, [], "modonly");

		if (channels?.includes(message.channel.id)) {
			this.client.logger.command(message, command, "ModOnly");
			return true;
		} else return false;
	}
}
