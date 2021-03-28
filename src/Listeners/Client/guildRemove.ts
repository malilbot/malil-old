import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import Client from "../../lib/Client";
import { main, sec, third, fourth, a1, split, sleep } from "../../lib/Utils";
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

	async exec(guild: Guild) {
		if (guild?.name) {
			this.client.logger.info(`${sec("[ SERVER KICK ]")} ${main(guild.name)} Fuck this guy removing me from his server`);
		}
	}
}
