import { Listener } from "discord-akairo";
import Client from "../../Classes/Client";
import { main, sec, third } from "../../Lib/Utils";
export default class messageReactionAdd extends Listener {
	public constructor(client: Client) {
		super("messageReactionAdd", {
			emitter: "client",
			event: "messageReactionAdd",
			category: "client",
		});
		this.client = client;
	}

	async exec(): Promise<void> {}
}
