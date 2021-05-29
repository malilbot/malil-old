import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MalilInhibitor } from "../Classes/MalilInhibitor";
export default class extends MalilInhibitor {
	constructor() {
		super("ModOnly", {
			reason: "ModOnly",
			priority: 7,
			type: "post",
		});
	}
	async exec(message: Message, command: Command): Promise<boolean> {
		if (!message.guild) return;
		if (this.client.isSuperUser(message.author.id)) return false;
		if (message.member.permissions.has("MANAGE_MESSAGES")) return false;

		const channels = await this.client.getModChannels(message.guild.id);

		if (channels?.includes(message.channel.id)) {
			this.client.logger.command(message, command, "ModOnly");
			return true;
		} else return false;
	}
}
