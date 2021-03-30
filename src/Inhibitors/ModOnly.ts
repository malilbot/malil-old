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
	public async exec(message: Message, command: Command): Promise<boolean> {
		if (superUsers.includes(message.author.id)) return false;
		if (message.member.permissions.has("MANAGE_MESSAGES")) return false;
		this.client.guilddata.ensure(message.guild.id, [], "modonly");

		const channels = this.client.guilddata.get(message.guild.id, "modonly");

		if (!channels[0]) return false;

		if (channels.includes(message.channel.id)) {
			if (message.channel.id == "824350969696354346") {
				if (`${command}`.toLowerCase() == "iq") {
					const cur = Number(this.client.UserData.get(message.member.id as string, "iq"));
					if (!cur) return;
					if (cur - 50 < 0) this.client.UserData.set(message.member.id, 1, "iq");
					else this.client.UserData.set(message.member.id, cur - 50, "iq");
				}
			}
			const { GStr, UStr } = Format(message, null, null, null);
			this.client.logger.info(a1(`[ USER ] ${UStr} [ GUILD ] ${GStr} [ MODONLY ]`));
			return true;
		}
	}
}
