import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class DmCommand extends Command {
	public constructor() {
		super("dm", {
			aliases: ["dm"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "content",
					match: "rest",
				},
			],
			description: {
				content: "dm's a user",
				usage: "dm",
				example: ["dm"],
			},
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	public async exec(message: Message, { args }) {
		const user = await GetMember(message, args);
		if (!user) return message.util.reply("User not found");
		user.send(args.split(" ").slice(1).join(" ") || "e").catch((e) => message.util.send(e, { allowedMentions: { repliedUser: false } }));
		message.util.send(`Dmed ${user.user.tag}`, { allowedMentions: { repliedUser: false } });
	}
}
