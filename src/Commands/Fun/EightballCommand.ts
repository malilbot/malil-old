import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../Lib/Utils";

export default class EightballCommand extends Command {
	public constructor() {
		super("eightball", {
			aliases: ["eightball", "8ball", "ask"],
			category: "Fun",
			quoted: false,
			args: [
				{
					id: "args",
					match: "content",
				},
			],
			description: {
				content: "Find your 8ball",
				usage: "eightball",
				example: ["eightball"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }) {
		if (!args)
			return message.util.send({
				embed: {
					color: `#FF0000`,
					description: `Please ask a question!`,
				},
				allowedMentions: { repliedUser: false },
			});

		const replies = [
			"Yes.",
			"No.",
			"Maybe.",
			"Yes and definitely.",
			"It is certain.",
			"As I see it, yes.",
			"Very doubtful.",
			"Eh I will say yes to that.",
			"NO!",
			"Yes - definitely.",
			"Most likely.",
			"Never.",
			"Better not tell you now",
			"My sources say no",
			"Nope.",
			"Scientifically yes.",
		];

		const result = Math.floor(Math.random() * replies.length);

		const wisdom = new MessageEmbed()
			.setAuthor(message.author.tag)
			.setColor(this.client.consts.colors.purple)
			.addField("Question", (await fixword(args)) || "haha censor go brrr")
			.addField("Answer", replies[result])
			.setFooter(`8ball`);
		message.util.send(wisdom);
	}
}
