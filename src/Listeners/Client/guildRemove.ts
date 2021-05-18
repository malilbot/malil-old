import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../Classes/Client";
export default class guildDelete extends Listener {
	constructor(client: Client) {
		super("guildDelete", {
			emitter: "client",
			event: "guildDelete",
			category: "client",
		});
		this.client = client;
	}

	async exec(guild: Guild): Promise<void> {
		if (!guild.name) return;
	}
}
