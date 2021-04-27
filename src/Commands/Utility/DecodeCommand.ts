import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { hst } from "../../Lib/Utils";
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
				content: "Decode some stuff",
				usage: "decode",
				example: ["decode"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }) {
		const embed = new MessageEmbed()
			.setTitle("Decode things")
			.setDescription("input: " + (await hst(args, true)) || "none")
			.addFields(
				{ name: "hex", value: (await hst(Buffer.from(args, "hex").toString(), true)) || "none", inline: true },
				{ name: "utf8", value: (await hst(Buffer.from(args, "utf8").toString(), true)) || "none", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "utf16le/ucs2", value: (await hst(Buffer.from(args, "ucs2").toString(), true)) || "none", inline: true },
				{ name: "base64", value: (await hst(Buffer.from(args, "base64").toString(), true)) || "none", inline: true }
			);
		message.util.send(embed);
		//Buffer.from.alloc(args, 'hex').toString()
	}
}
