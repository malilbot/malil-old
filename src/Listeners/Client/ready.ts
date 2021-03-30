import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { readyLog } from "../../lib/Utils";
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
	public exec(): void {
		if (this.client?.shard?.ids[0] == this.client.options.shardCount - 1 && this.client.shard.ids[0] !== 0) {
			this.client.logger.info("[ MAXSHARDS ]");
			return;
		}
		if (this.client?.shard?.ids[0] !== 0) return;
		return readyLog(this.client);
	}
}
