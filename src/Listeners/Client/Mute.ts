import { Listener } from "discord-akairo";
import type Client from "../../lib/Client";
import { sec, main, third, Format, Infract } from "../../lib/Utils";
import { GuildMember } from "discord.js";
export default class Raw extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("mute", {
			emitter: "client",
			event: "mute",
			category: "client",
		});
		this.client = client;
	}

	public async exec(member: GuildMember, time: number | string) {
		const role = member.guild.roles.cache.get(this.client.mutes.get(member.guild.id, "role"));
		member.roles.add(role, "User muted").catch((e) => this.client.mutes.delete(member.guild.id, "role"));
		if (time == "PERM") return;
		console.log(
			main(`[ MUTED ] ${sec(member.user.tag)} ${third(member.user.id)} [ IN ] ${sec(member.guild.name)} ${third(member.guild.id)}`)
		);
		const client = this.client;
		const msg = function () {
			//execute tasks
			console.log(
				main(
					`[ UNMUTED ] ${sec(member.user.tag)} ${third(member.user.id)} [ IN ] ${sec(member.guild.name)} ${third(
						member.guild.id
					)}`
				)
			);
			member.roles.remove(role, "mute duration expired");
			Infract(null, "Mute duration expired", member, "UNMUTE", client);
			//message.reply("times up");
		};
		setTimeout(msg, time as number);
	}
}
