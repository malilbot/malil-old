import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class DecodeCommand extends Command {
	public constructor() {
		super("decode", {
			aliases: ["decode"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "none",
				},
			],
			description: {
				content: "",
				usage: "decode",
				example: ["decode"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }) {
		const embed = new MessageEmbed()
			.setTitle("Decode things")
			.setDescription("input: " + args || "none")
			.addFields(
				{ name: "hex", value: Buffer.from(args, "hex").toString() || "none", inline: true },
				{ name: "utf8", value: Buffer.from(args, "utf8").toString() || "none", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "utf16le/ucs2", value: Buffer.from(args, "ucs2").toString() || "none", inline: true },
				{ name: "base64", value: Buffer.from(args, "base64").toString() || "none", inline: true }
			);
		message.util.send(embed);
		//Buffer.from.alloc(args, 'hex').toString()
	}
}
