import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { fixspace } from "../../lib/Utils";
import { log } from "console";
import { TextChannel } from "discord.js";
import { exec } from "child_process";
import { main, sec, third, fourth, split, Infract } from "../../lib/Utils";
import { GuildMember, Role } from "discord.js";
import { Guild } from "discord.js";
const { floor, random } = Math;
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
					//const msg =
					const client = this.client;
					setTimeout(async function () {
						const guild = client.guilds.cache.get(Element as string) || (await client.guilds.fetch(Element as string));
						const role: Role = guild.roles.cache.get(MRole) || (await guild.roles.fetch(MRole));
						const member: GuildMember = guild.members.cache.get(key) || (await guild.members.fetch(key));
						client.logger.info(
							main(
								`[ UNMUTED ] ${sec(member.user.tag)} ${third(member.user.id)} [ IN ] ${sec(guild.name)} ${third(guild.id)}`
							)
						);

						member.roles.remove(role, "mute duration expired");
						Infract(null, "Mute duration expired", member, "UNMUTE", client);
					}, time - Date.now());
				}
			});
		});
		/*
		let server: string | string[];
		let i = -1;
		for (server of res) {
			i++;
			//console.log("----------------");
			//console.log(server);
			//console.log("----------------");

			//const mutes = this.client.mutes.get(server, "mutes:");
			let mute: string | string[] | any;
			for (mute of server) {
				if (typeof mute == "object") {
					console.log(mute);
					Object.keys(mute.mutes).forEach(async (key) => {
						if (Date.now() > mute.mutes[key]) {
							const obj = this.client.mutes.get(keys[i], `mutes`);
							console.log(keys[i]);
							console.log("----------------");
							console.log(obj);
							console.log("----------------");
							delete obj[key];
							console.log("----------------");
							console.log(obj);
							console.log("----------------");
							this.client.mutes.set(keys[i], obj);
						} else {
							const time = mute.mutes[key];
							const msg = async function () {
								const guild: Guild =
									this.client.guilds.cache.get(keys[i] as string) || (await this.client.guilds.fetch(keys[i] as string));
								const role: Role =
									guild.roles.cache.get(this.client.mutes.get(keys[i], `role`)) ||
									(await guild.roles.fetch(this.client.mutes.get(keys[i], `role`)));
								const member: GuildMember = guild.members.cache.get(key) || (await guild.members.fetch(key));
								//execute tasks
								member.roles.remove(role);
								//message.reply("times up");
							};
							setTimeout(msg, time - Date.now());
						}
					});
				}
			}
		}
        */
	}
}
