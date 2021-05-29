import { MalilListener } from "../../Classes/MalilListener";
import { Guild } from "discord.js";
import Client from "../../Classes/Client";
import { main } from "../../Lib/Utils";
export default class guildCreate extends MalilListener {
	constructor(client: Client) {
		super("guildCreate", {
			emitter: "client",
			event: "guildCreate",
			category: "client",
		});
		this.client = client;
	}

	async exec(guild: Guild): Promise<void> {
		if (!guild.name) return;
		try {
			this.client.regSlash({ guild: guild.id, language: 1 });
		} catch (e) {}
		//if (this.client.blacklist.get("blacklist", "leavelist").includes(guild.id)) return guild.leave();
		console.log(main("--------------------------------------------------------"));
		console.log(`Guild add ${guild.name} ${(await guild.fetchOwner()).user.tag}`);
		console.log(main("--------------------------------------------------------"));
	}
}
