import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import * as db from "quick.db";
import moment from "moment";
import { TextChannel, Message } from "discord.js";

export default class SnipeCommand extends Command {
	public constructor() {
		super("snipe", {
			aliases: [
				"snipe"
			],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "",
				usage: "snipe",
				example: [
					"snipe"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		let content = db.get(`snipe.${message.guild.id}.${message.channel.id}.content`);
		if (!content) return message.reply("No Snipes found in this channel");
		let author = db.get(`snipe.${message.guild.id}.${message.channel.id}.author`);
		if (!author) return message.reply("No Snipes found in this channel");
		const Embed = new MessageEmbed().setColor("#8E44AD").setTitle(`Snipe`).addField(author, content);
		message.channel.send(Embed);
	}
}
