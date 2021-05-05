import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class UwuCommand extends Command {
	public constructor() {
		super("uwu", {
			aliases: ["uwu", "owo"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "uwu",
				},
			],
			description: {
				content: "Honestly dont know what this is",
				example: ["Uwu hello owo"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<Message> {
		const faces = [`(・'ω'・)`, ";;w;;", "owo", "UwU", ">w<", "^w^", "0w0", "*w*"];
		function Owoify(str) {
			return str
				.replace(/(?:r|l|h)/g, "w")
				.replace(/(?:R|L|H)/g, "W")
				.replace(/n([aeiou])/g, "ny$1")
				.replace(/N([aeiou])/g, "Ny$1")
				.replace(/N([AEIOU])/g, "Ny$1")
				.replace(/ove/g, "uv")
				.replace(/!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");
		}

		// Get question to answer
		const text = await fixword(args || "haha censor go brrrr");
		if (!text) {
			return message.util.send(`**You need to specify a message..**`);
		}

		// Send message
		message.util.send(`${Owoify(text)}`);
	}
}
