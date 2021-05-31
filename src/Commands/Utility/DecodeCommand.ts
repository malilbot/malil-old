import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class DecodeCommand extends Command {
	constructor() {
		super("decode", {
			aliases: ["decode"],
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
					description: "Text you want to decode",
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
			.setTitle("Decode things")
			.setDescription("input: " + (await hst(text, true)) || "none")
			.addFields(
				{ name: "hex", value: (await hst(Buffer.from(text, "hex").toString(), true)) || "none", inline: true },
				{ name: "utf8", value: (await hst(Buffer.from(text, "utf8").toString(), true)) || "none", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "utf16le/ucs2", value: (await hst(Buffer.from(text, "ucs2").toString(), true)) || "none", inline: true },
				{ name: "base64", value: (await hst(Buffer.from(text, "base64").toString(), true)) || "none", inline: true }
			);
		return message.reply(embed);
	}
}
