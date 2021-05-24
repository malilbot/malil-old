import Command from "../../Classes/malilCommand";

import { Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class semojiCommand extends Command {
	constructor() {
		super("semoji", {
			aliases: ["semoji"],
			category: "Developer",
			description: {
				content: "NO",
				example: "NO",
			},
			ratelimit: 3,
			args: [
				{
					id: "emoji",
					type: "string",
					match: "rest",
				},
			],
			superUserOnly: true,
			channel: "guild",
		});
	}

	async exec(message: Message, { emoji }: { emoji: string }): Promise<void> {
		try {
			message.delete().catch(() => {});
		} catch (e) {}
		const str = `${this.client.emojis.cache.find((e) => e.name.includes(emoji) && e.animated)}`;
		if (str == "undefined") return;
		message.channel.send(str);
	}
}
