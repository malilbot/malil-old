import { Listener } from "discord-akairo";
import Client from "../../Classes/Client";
import { main, sec, third } from "../../Lib/Utils";
export default class messageReactionRemove extends Listener {
	constructor(client: Client) {
		super("messageReactionRemove", {
			emitter: "client",
			event: "messageReactionRemove",
			category: "client",
		});
		this.client = client;
	}

	async exec(): Promise<void> {}
}
