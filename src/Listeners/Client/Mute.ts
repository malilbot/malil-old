import { MalilListener } from "../../Classes/MalilListener";
import { Infract } from "../../Lib/Utils";
import { GuildMember, Message } from "discord.js";
export default class Raw extends MalilListener {
	constructor() {
		super("mute", {
			emitter: "client",
			event: "mute",
			category: "client",
		});
	}

	async exec(member: GuildMember, time: number | string, message: Message): Promise<void> {
		const role = member.guild.roles.cache.get(this.client.mutes.get(member.guild.id, "role"));
		member.roles.add(role, "User muted").catch((e) => this.client.mutes.delete(member.guild.id, "role"));
		if (time == "PERM") return;
		const msg = function () {
			member.roles.remove(role, "mute duration expired");
			Infract(message, "Mute duration expired", member, "UNMUTE", this.client);
		};
		setTimeout(msg, time as number);
	}
}
