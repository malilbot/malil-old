import { Listener } from "discord-akairo";
import { main, sec } from "../../Lib/Utils";
import Client from "../../Classes/Client";
import { MessageEmbed, Message } from "discord.js";
const talkedRecently = new Set();
const Talk = new Set();
export default class CoolDown extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("CoolDown", {
			emitter: "commandHandler",
			event: "cooldown",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message): void {
		if (!talkedRecently.has(message.author.id)) {
			if (!Talk.has(message.author.id)) {
				message.util.send(new MessageEmbed().setTitle("You are using commands too fast please slow down").setImage("https://http.cat/429").setColor(this.client.consts.colors.red));
				talkedRecently.add(message.author.id);
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 60000);
			}
			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 60000);
		}
		this.client.logger.info(`${main("[ RATE LIMIT ]")} (${sec(message.author.tag)}) ${sec(message.author.id)}`);
	}
}
