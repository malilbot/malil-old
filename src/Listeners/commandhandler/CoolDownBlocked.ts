import { Listener, Command } from "discord-akairo";
import Client from "../../Classes/Client";
import { MessageEmbed, Message } from "discord.js";
const talkedRecently = new Set();
const Talk = new Set();
export default class CoolDown extends Listener {
	public constructor(client: Client) {
		super("CoolDown", {
			emitter: "commandHandler",
			event: "cooldown",
			category: "commandHandler",
		});
		this.client = client;
	}

	exec(message: Message, command: Command): void {
		if (!talkedRecently.has(message.author.id)) {
			if (!Talk.has(message.author.id)) {
				message.util.send(new MessageEmbed().setTitle("You are using commands too fast please slow down").setImage("https://http.cat/429").setColor(this.client.colors.red));
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
		this.client.logger.command(message, command, "Missing perms");
	}
}
