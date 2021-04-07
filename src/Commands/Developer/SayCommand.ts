import { Command } from "discord-akairo";

import { Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class SayCommand extends Command {
	public constructor() {
		super("say", {
			aliases: ["say", "tell"],
			category: "Developer",
			description: {
				content: "force the bot to say stuff",
				usage: "say",
				example: ["say pog"],
			},
			ratelimit: 3,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest",
					default: "Please input some code",
				},
			],
			superUserOnly: true,
			channel: "guild",
		});
	}

	public async exec(message: Message, { code }) {
		try {
			message.delete().catch((e) => {
				message.author.send("Me  can no delete your message");
			});
		} catch (e) {
			return;
		}

		message.util.send((await fixword(code.replace(/@/, "@​"))) || "Sorry i just prevented weird stuff");
	}
}
