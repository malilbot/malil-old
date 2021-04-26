import { Command } from "discord-akairo";

import { Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class semojiCommand extends Command {
	public constructor() {
		super("semoji", {
			aliases: ["semoji"],
			category: "Developer",
			description: {
				content: "force the bot to semoji stuff",
				usage: "semoji",
				example: ["semoji pog"],
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

	public async exec(message: Message, { emoji }: { emoji: string }): Promise<void> {
		try {
			message.delete().catch(() => {});
		} catch (e) {}
		const str = `${this.client.emojis.cache.find((e) => e.name.includes(emoji) && e.animated)}`;
		if (str == "undefined") return;
		message.channel.send(str);
	}
}
