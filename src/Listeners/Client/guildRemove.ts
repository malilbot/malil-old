import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../lib/Client";
import { sLog } from "../../lib/Utils";
export default class guildDelete extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("guildDelete", {
			emitter: "client",
			event: "guildDelete",
			category: "client",
		});
		this.client = client;
	}

	async exec(guild: Guild): Promise<void> {
		if (!guild.name) return;
		sLog({ type: "GUILDDELETE", guild: guild });
	}
}
