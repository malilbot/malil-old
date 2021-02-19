import { Listener } from "discord-akairo";

import Client from "../../client/Client";
const talkedRecently = new Set();
const Talk = new Set();
export default class CoolDown extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("CoolDown", {
			emitter: "commandHandler",
			event: "cooldown",
			category: "commandHandler"
		});
		this.client = client;
	}

	exec(message, command, reason) {
		if (!talkedRecently.has(message.author.id)) {
			if (!Talk.has(message.author.id)) {
				message.channel.send(`You are using commands too fast please slow down`);
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
		this.client.logger.info(`\x1b[32mRate limit \x1b[33m- \x1b[32m${message.author.tag} (${message.author.id})`);
	}

}
