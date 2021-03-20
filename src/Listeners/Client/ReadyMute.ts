import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { main, sec, third, Infract } from "../../lib/Utils";
import { GuildMember, Role } from "discord.js";
export default class MuteReady extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("MuteReady", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}
	public async exec() {
		//const res = this.client.mutes.fetchEverything();
		const keys = this.client.mutes.keyArray();
		keys.forEach((Element) => {
			const mutes = this.client.mutes.get(Element, "mutes");
			if (mutes == "{}") return;
			Object.keys(mutes).forEach(async (key) => {
				if (Date.now() > mutes[key]) {
					const obj = this.client.mutes.get(Element, "mutes");
					this.client.mutes.set(Element, obj, "mutes");
				} else {
					const MRole = this.client.mutes.get(Element, `role`);
					const time = mutes[key];
					const client = this.client;
					setTimeout(async function () {
						const guild = client.guilds.cache.get(Element as string) || (await client.guilds.fetch(Element as string));
						const role: Role = guild.roles.cache.get(MRole) || (await guild.roles.fetch(MRole));
						const member: GuildMember = guild.members.cache.get(key) || (await guild.members.fetch(key));
						client.logger.info(main(`[ UNMUTED ] ${sec(member.user.tag)} ${third(member.user.id)} [ IN ] ${sec(guild.name)} ${third(guild.id)}`));

						member.roles.remove(role, "mute duration expired");
						Infract(null, "Mute duration expired", member, "UNMUTE", client);
					}, time - Date.now());
				}
			});
		});
	}
}
