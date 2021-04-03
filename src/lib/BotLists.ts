import centra from "centra";
import { Client } from "discord.js";
export default class BotLists {
	client: Client;
	topgg: string;
	discordbotlist: string;
	bladebotlist: string;
	discordextremelist: string;
	botsgg: string;
	verbose: boolean;

	constructor(client: Client, { topgg = "none", discordbotlist = "none", bladebotlist = "none", discordextremelist = "none", botsgg = "none", verbose = false }) {
		this.verbose = verbose;
		this.client = client;
		this.topgg = topgg;
		this.discordbotlist = discordbotlist;
		this.bladebotlist = bladebotlist;
		this.discordextremelist = discordextremelist;
		this.botsgg = botsgg;
	}
	async post() {
		const topgg = {
			server_count: this.client.guilds.cache.size,
			shard_count: this.client.shard.ids.length,
			shard_id: this.client.shard.ids[0],
		};
		try {
			await centra(`https://top.gg/api/bots/${this.client.user.id}/stats`, "post").header("Authorization", this.topgg).body(topgg).send();
		} catch (err) {
			console.warn("[ COULD NOT POST TO TOPGG ]");
		}

		const discordbotlist = {
			guilds: this.client.guilds.cache.size,
			users: this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
			shard_id: this.client.shard.ids[0],
		};
		try {
			await centra(`https://discordbotlist.com/api/v1/bots/${this.client.user.id}/stats`, "post").header("Authorization", this.discordbotlist).body(discordbotlist).send();
		} catch (err) {
			console.warn("[ COULD NOT POST TO discordbotlist ]");
		}
	}
}
