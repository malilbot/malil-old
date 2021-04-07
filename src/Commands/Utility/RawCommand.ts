import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class RawCommand extends Command {
	public constructor() {
		super("raw", {
			aliases: ["raw"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "Share your questions",
				usage: "raw",
				example: ["raw"],
			},
			ratelimit: 3,
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
		});
	}

	public exec(message: Message, { args }: { args: string }): void {
		if (!args) {
			message.reply("Cant really display nothing");
		} else {
			if (args.length > 2048) {
				hst(args).then((r) => {
					message.reply(r);
				});
			} else {
				message.channel.send("```" + args + "```");
			}
		}
	}
}
