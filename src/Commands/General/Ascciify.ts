import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";
var asciify = require("asciify-image");
export default class AsciifyCommand extends Command {
	public constructor() {
		super("asciify", {
			aliases: [
				"asciify",
				"ascii",
				"assci",
				"asccii",
				"asci"
			],
			args: [
				{
					id: "big",
					type: "string",
					flag: "--big",
					match: "option"
				}
			],
			category: "General",
			quoted: true,
			description: {
				content: "",
				usage: "asciify",
				example: [
					"asciify"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { big }) {
		const options = {
			fit: "box",
			width: 64,
			height: 64,
			color: false
		};
		const bigoptions = {
			fit: "box",
			width: 256,
			height: 256,
			color: false
		};
		let url;
		if (message.attachments) {
			message.attachments.forEach((attachment) => {
				url = attachment;
			});
		}
		if (!url) message.reply("please add a image attachment");
		const option = big ? bigoptions : options;
		console.log(option);
		async function post(input) {
			const data = await fetch("https://hst.skyblockdev.repl.co/documents", {
				method: "post",
				body: input
			})
				.then((response) => response.json())
				.catch((e) => {});
			return data.key;
		}

		asciify(url, option, async function(err, asciified) {
			if (err) message.reply("a error occured");

			// Print to console
			message.reply("Success! " + "https://hst.skyblockdev.repl.co/" + (await post(asciified)));
		});
	}
}
