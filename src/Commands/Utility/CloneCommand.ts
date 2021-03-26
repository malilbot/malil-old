import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../lib/Utils";
export default class CloneCommand extends Command {
	public constructor() {
		super("clone", {
			aliases: ["clone", "yoink", "steal", "emo"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "Yoinks a emoji from a server",
				usage: "clone",
				example: ["clone"],
			},
			ratelimit: 3,
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
		});
	}

	public async exec(message: Message, { args }): Promise<void> {}
}
