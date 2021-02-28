import { Command } from "discord-akairo";
import { MessageManager, Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class EncodeCommand extends Command {
	public constructor() {
		super("encode", {
			aliases: [
				"encode"
			],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "none"
				}
			],
			description: {
				content: "",
				usage: "encode",
				example: [
					"encode"
				]
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		const embed = new MessageEmbed()
			.setTitle("Encode things")
			.setDescription("input: " + args || "none")
			.addFields(
				{ name: "hex", value: Buffer.from(args).toString("hex") || "none", inline: true },
				{ name: "utf8", value: Buffer.from(args).toString("utf8") || "none", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "utf16le/ucs2", value: Buffer.from(args).toString("ucs2") || "none", inline: true },
				{ name: "base64", value: Buffer.from(args).toString("base64") || "none", inline: true }
			);
		message.channel.send(embed);
		// const encoded = Buffer.from(args).toString('hex'); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
		// const decoded = Buffer.from(encoded, 'hex').toString(); // decoded === "This is my string to be encoded/decoded"
		// message.channel.send(encoded)
		// message.channel.send(decoded)
	}
}
