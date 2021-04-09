import { Listener } from "discord-akairo";
import type Client from "../../Classes/Client";
import { Infract } from "../../Lib/Utils";
import { GuildMember } from "discord.js";
export default class Raw extends Listener {
	public constructor(client: Client) {
		super("mute", {
			emitter: "client",
			event: "mute",
			category: "client",
		});
		this.client = client;
	}

	public async exec(member: GuildMember, time: number | string): Promise<void> {
		const role = member.guild.roles.cache.get(this.client.mutes.get(member.guild.id, "role"));
		member.roles.add(role, "User muted").catch((e) => this.client.mutes.delete(member.guild.id, "role"));
		if (time == "PERM") return;
		const client = this.client;
		const msg = function () {
			member.roles.remove(role, "mute duration expired");
			Infract(null, "Mute duration expired", member, "UNMUTE", client);
		};
		setTimeout(msg, time as number);
	}
}
