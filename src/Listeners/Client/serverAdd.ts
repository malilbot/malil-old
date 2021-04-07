import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../Classes/Client";
import { sLog } from "../../Lib/Utils";
export default class guildCreate extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("guildCreate", {
			emitter: "client",
			event: "guildCreate",
			category: "client",
		});
		this.client = client;
	}

	exec(guild: Guild): void {
		if (!guild.name) return;
		//if (this.client.blacklist.get("blacklist", "leavelist").includes(guild.id)) return guild.leave();
		sLog({ type: "GUILDADD", guild });
	}
}
