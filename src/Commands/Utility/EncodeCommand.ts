import Command from "../../Classes/malilCommand";
import { MessageManager, Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class EncodeCommand extends Command {
	constructor() {
		super("encode", {
			aliases: ["encode"],
			category: "Utility",
			quoted: true,
			slash: true,
			args: [
				{
					id: "text",
					type: "array",
					match: "rest",
					default: "none",
				},
			],
			options: [
				{
					type: 3,
					name: "text",
					description: "Text you want to encode",
					required: false,
				},
			],

			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	async exec(message: Message, { text }: { text: string }): Promise<Message> {
		const embed = new MessageEmbed()
			.setTitle("Encode things")
			.setDescription("input: " + (await hst(text, true)) || "none")
			.addFields(
				{
					name: "hex",
					value: (await hst(Buffer.from(text).toString("hex"), true)) || "none",
					inline: true,
				},
				{
					name: "utf8",
					value: (await hst(Buffer.from(text).toString("utf8"), true)) || "none",
					inline: true,
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "utf16le/ucs2",
					value: (await hst(Buffer.from(text).toString("ucs2"), true)) || "none",
					inline: true,
				},
				{
					name: "base64",
					value: (await hst(Buffer.from(text).toString("base64"), true)) || "none",
					inline: true,
				}
			);
		return message.reply(embed);
	}
}
