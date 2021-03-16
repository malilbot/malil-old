import { Listener } from "discord-akairo";
import type Client from "../../lib/Client";
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

	public exec(member: GuildMember, time: string) {
		console.log(time);
	}
}
