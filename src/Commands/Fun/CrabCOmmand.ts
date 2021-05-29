import Command from "../../Classes/malilCommand";
import { fixword } from "../../Lib/Utils";
import { Message } from "discord.js";
export default class CrabCommand extends Command {
	constructor() {
		super("crab", {
			aliases: ["crab"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "Me When No Arguments",
				},
			],
			description: "",
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { args }: { args: string }): Promise<void> {
		//🦀
		message.reply("🦀" + (await fixword(args.replace("/s+/g", "🦀").split(" ").join("🦀"))) + "🦀");
	}
}
