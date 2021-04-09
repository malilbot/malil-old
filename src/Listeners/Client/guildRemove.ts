import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../Classes/Client";
import { sLog } from "../../Lib/Utils";
export default class guildDelete extends Listener {
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
