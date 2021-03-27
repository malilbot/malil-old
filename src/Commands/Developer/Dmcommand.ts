import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../lib/Utils";
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
		const user = (await GetMember(message)) || message.member;
		user.send(args || "e").catch((e) => message.util.send(e, { allowedMentions: { repliedUser: false } }));
		message.util.send("message recieved", { allowedMentions: { repliedUser: false } });
	}
}
