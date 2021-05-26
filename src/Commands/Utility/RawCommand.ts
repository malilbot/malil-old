import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class RawCommand extends Command {
	constructor() {
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
				content: "RAW_DESCRIPTION_CONTENT",
				example: "RAW_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
		});
	}

	async exec(message: Message, { args }: { args: string }): void {
		if (!args) {
			message.reply("Cant really display nothing");
		} else {
			if (args.length > 2048) {
				const res = await hst(args);
				message.reply(res);
			} else {
				message.channel.send("```" + args + "```");
			}
		}
	}
}
