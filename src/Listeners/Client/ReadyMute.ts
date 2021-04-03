import { Listener } from "discord-akairo";
import Client from "../../classes/Client";
import { Infract } from "../../lib/Utils";
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
	public async exec(): Promise<void> {
		//const res = this.client.mutes.fetchEverything();
		const keys = this.client.mutes.keyArray();
		keys.forEach((Allmutes) => {
			const mutes = this.client.mutes.get(Allmutes, "mutes");
			if (mutes == "{}") return;
			Object.keys(mutes).forEach(async (key) => {
				if (Date.now() > mutes[key]) {
					const obj = this.client.mutes.get(Allmutes, "mutes");
					this.client.mutes.set(Allmutes, obj, "mutes");
				} else {
					const MRole = this.client.mutes.get(Allmutes, `role`);
					const time = mutes[key];
					const client = this.client;
					setTimeout(async function () {
						const guild = client.guilds.cache.get(Allmutes as string) || (await client.guilds.fetch(Allmutes as string));
						const role: Role = guild.roles.cache.get(MRole) || (await guild.roles.fetch(MRole));
						const member: GuildMember = guild.members.cache.get(key) || (await guild.members.fetch(key));
						member.roles.remove(role, "mute duration expired");
						Infract(null, "Mute duration expired", member, "UNMUTE", client);
					}, time - Date.now());
				}
			});
		});
	}
}
