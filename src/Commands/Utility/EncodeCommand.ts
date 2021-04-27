import { Command } from "discord-akairo";
import { MessageManager, Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class EncodeCommand extends Command {
	public constructor() {
		super("encode", {
			aliases: ["encode"],
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
				content: "Encode your message",
				usage: "encode",
				example: ["encode"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle("Encode things")
			.setDescription("input: " + hst(args, true) || "none")
			.addFields(
				{
					name: "hex",
					value: (await hst(Buffer.from(args).toString("hex"), true)) || "none",
					inline: true,
				},
				{
					name: "utf8",
					value: (await hst(Buffer.from(args).toString("utf8"), true)) || "none",
					inline: true,
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "utf16le/ucs2",
					value: (await hst(Buffer.from(args).toString("ucs2"), true)) || "none",
					inline: true,
				},
				{
					name: "base64",
					value: (await hst(Buffer.from(args).toString("base64"), true)) || "none",
					inline: true,
				}
			);
		return message.util.send(embed);
	}
}
