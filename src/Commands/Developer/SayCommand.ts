import Command from "../../Classes/malilCommand";

import { Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class SayCommand extends Command {
	constructor() {
		super("say", {
			aliases: ["say", "tell"],
			category: "Developer",
			description: {
				content: "NO",
				example: "NO",
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

	async exec(message: Message, { code }): Promise<void> {
		try {
			message.delete().catch((e) => {
				message.author.send("Me  can no delete your message");
			});
		} catch (e) {}

		message.util.send((await fixword(code.replace(/@/, "@​"))) || "Sorry i just prevented weird stuff");
	}
}
