import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import centra from "centra";
export default class BotListCommand extends Command {
	public constructor() {
		super("botList", {
			aliases: ["botList"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "",
				usage: "botList",
				example: ["botList"]
			},
			ratelimit: 3,
			ownerOnly: true,
			channel: "guild"
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		if (this.client.user.id !== "749020331187896410") return message.reply("Not sure if you want todo this chief");
		message.reply("EWWW");
	}
}
