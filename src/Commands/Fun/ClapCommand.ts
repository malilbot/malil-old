import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class ClapCommand extends Command {
	constructor() {
		super("clap", {
			aliases: ["clap"],
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
			description: {
				content: "CLAP_DESCRIPTION_CONTENT",
				example: "CLAP_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { args }): Promise<void> {
		message.util.send("👏" + (await fixword(args.replace("/s+/g", "👏").replace(/@/g, "@​").split(" ").join("👏"))) + "👏");
	}
}
