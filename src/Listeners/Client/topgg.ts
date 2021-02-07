import { Listener } from "discord-akairo";
import Client from "../../client/Client";
import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";
import * as Topgg from "@top-gg/sdk";

export default class topgg extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("topgg", {
			emitter: "client",
			event: "ready",
			category: "client"
		});
		this.client = client;
	}

	async exec() {
		if (this.client.user.id == "800389986042118175") return;

		const api = new Topgg.Api(process.env.TOPGG);

		setInterval(() => {
			api.postStats({
				serverCount: this.client.guilds.cache.size,
				shardCount: this.client.options.shardCount
			});
		}, 1800000);
	}
}
