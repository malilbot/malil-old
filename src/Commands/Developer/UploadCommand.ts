import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import util from "util";
import { gist } from "../../Utils/Utils";
import centra from "centra";
import fetch from "node-fetch";
import * as db from "quick.db";

export default class UploadCommand extends Command {
	public constructor() {
		super("upload", {
			aliases: [
				"upload"
			],
			category: "Developer",
			description: {
				content: "Who the fuck knows",
				usage: "Secret info",
				example: [
					"yes"
				]
			},
			ratelimit: 3,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest"
				}
			],
			channel: "guild"
		});
	}
	public async exec(message: Message, { code }) {
		//https://gist.github.com/

		//
		//
		async function post(input) {
			const data = await fetch("https://hst.skyblockdev.repl.co/documents", {
				method: "post",
				body: input
			})
				.then((response) => response.json())
				.catch((e) => {});
			return data.key;
		}
		const first = code.split(" ").slice(1).toString().replace(/,/g, " ");
		const term = code.split(" ");
		if (term[0] == "hst" || term[0] == "haste" || term[0] == "bin") {
			message.reply(
				new MessageEmbed()
					.setColor("green")
					.addField("Upload", "https://hst.skyblockdev.repl.co/" + (await post(first)))
			);
		} else if (term[0] == "gist" || term[0] == "github") {
			if (message.author.id !== "336465356304678913") return;
			message.reply(
				new MessageEmbed()
					.setColor("white")
					.addField("Upload", "https://gist.github.com/" + (await gist("upload", first)))
			);
		} else message.reply("Please mention a platform");
	}
}
