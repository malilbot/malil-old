import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { fixspace } from "../../lib/Utils";
import { log } from "console";
import { TextChannel } from "discord.js";
import { exec } from "child_process";
import { main, sec, third, fourth, split, readyLog } from "../../lib/Utils";
const { floor, random } = Math;
export default class Ready extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}
	public async exec(): Promise<void> {
		if (this.client?.shard?.ids[0] == this.client.options.shardCount - 1 && this.client.shard.ids[0] !== 0) {
			this.client.logger.info("[ MAXSHARDS ]");
			return;
		}
		if (this.client?.shard?.ids[0] !== 0) return;
		readyLog(this.client);
	}
}
