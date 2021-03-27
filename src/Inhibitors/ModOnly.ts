import { Inhibitor, Command } from "discord-akairo";
import { Message } from "discord.js";
import { superUsers } from "../lib/config";
import { Format, a1 } from "../lib/Utils";
export default class extends Inhibitor {
	constructor() {
		super("ModOnly", {
			reason: "ModOnly",
			priority: 7,
			type: "post",
		});
	}
	public async exec(message: Message): Promise<boolean> {
		if (superUsers.includes(message.author.id)) return false;
		if (message.member.permissions.has("MANAGE_MESSAGES")) return false;
		this.client.guilddata.ensure(message.guild.id, [], "modonly");
		const channels = this.client.guilddata.get(message.guild.id, "modonly");
		if (!channels) return false;

		if (channels?.include(message.channel.id)) {
			const { GStr, UStr } = Format(message, null, null, null);
			this.client.logger.info(a1(`[ USER ] ${UStr} [ GUILD ] ${GStr} [ MODONLY ]`));
			return true;
		}
	}
}
