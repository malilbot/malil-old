import { Command } from "discord-akairo";
import type { Message, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../lib/Utils";
export default class setiqCommand extends Command {
	public constructor() {
		super("setiq", {
			aliases: ["setiq"],
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
				content: "setiq's a user",
				usage: "setiq",
				example: ["setiq"],
			},
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	public async exec(message: Message, { args }) {
		if (!args) return message.reply("No args");
		args.split(" ");
		if (!args[1]) return message.reply("No iq provided");
		const user = await GetMember(message, args[0]);
		if (!user) return message.reply("No user provided");
		const iq = args[1].parseInt()
		if (!iq) return message.reply("thats not a number");
		if (iq < 0 || iq > 150) return message.reply("thats to much");
		this.client.UserData.set(user.user.id, iq, "iq");
	}
}
