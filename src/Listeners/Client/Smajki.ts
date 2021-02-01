import { Listener } from "discord-akairo";

import Client from "../../client/Client";

import { Message } from "discord.js";

export default class smajki extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("smajki", {
			emitter: "client",
			event: "message",
			category: "client"
		});
		this.client = client;
	}
	public async exec(message: Message) {
		if (!message.guild) return;
		if (message.guild.id == "701833606280118282") {
			if (message.content.toLowerCase().includes("smajki") || message.content.toLowerCase().includes("smajk")) {
				message.react("786270601857728583");
				message.react("786270602151067698");
				message.react("786270602532749352");
				message.react("786270602423173131");
				message.react("786270602860167218");
				message.react("786270603061493770");
			}
			if (message.content.toLowerCase().includes("ege") || message.content.toLowerCase().includes("egg")) {
				message.react("786270668697501730");
				message.react("786270668668796978");
				message.react("786270668023005205");
				message.react("786270667883937852");
				message.react("786270667070636034");
				message.react("786270666726047816");
			}
			if (message.content.toLowerCase().includes("quaktism") || message.content.toLowerCase().includes("quak")) {
				message.react("�");
				message.react("�");
				message.react("�");
				message.react("�");
			}
		} else return;
	}
}
