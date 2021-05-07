import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../Classes/Client";
import { main } from "../../Lib/Utils";
export default class guildCreate extends Listener {
	public constructor(client: Client) {
		super("guildCreate", {
			emitter: "client",
			event: "guildCreate",
			category: "client",
		});
		this.client = client;
	}

	async exec(guild: Guild): Promise<void> {
		if (!guild.name) return;
		//if (this.client.blacklist.get("blacklist", "leavelist").includes(guild.id)) return guild.leave();
		console.log(main("--------------------------------------------------------"));
		console.log(`Guild add ${guild.name} ${(await guild.fetchOwner()).user.tag}`);
		console.log(main("--------------------------------------------------------"));
	}
}
