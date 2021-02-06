import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import util from "util";
import { gist } from "../../Utils/Utils";
import centra from "centra";
import fetch from "node-fetch";
import * as db from "quick.db";

export default class EvalCommand extends Command {
	public constructor() {
		super("eval", {
			aliases: [
				"eval",
				"ev"
			],
			category: "Developer",
			description: {
				content: "Some super javascript code",
				usage: "eval < javascript >",
				example: [
					"eval message.guild.id"
				]
			},
			ratelimit: 3,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest",
					default: "Please input some code"
				}
			],
			ownerOnly: true,
			channel: "guild"
		});
	}
	public async exec(message: Message, { code }) {
		//https://gist.github.com/

		let field: any = function dm(guy, message, client) {
			return client.users.fetch(guy).then((user) => user.send(message));
		};
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
		function channel(chanid, message, client) {
			return client.channels.fetch(chanid).then((channel) => channel.send(message));
		}
		//
		const evalcode = code;

		let gists = "";
		if (code.includes("--silent")) code = code.replace("--silent", "");
		if (code.includes("--delete")) code = code.replace("--delete", "") && message.delete();
		const embed = new MessageEmbed()
			.setTitle(`${this.client.user.tag}'s Evaled`)
			.setColor("RED")
			.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``);

		try {
			var evaled = await eval(code);

			const output = util.inspect(evaled, { depth: 0 });
			if (output.length > 1024) {
				embed.addField("🫓 Output", "https://hst.skyblockdev.repl.co/" + (await post(output)));
				embed.addField("Type", typeof evaled);
			} else {
				embed.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``);
				embed.addField("Type", typeof evaled);
			}
		} catch (e) {
			const error = e;
			if (error.length > 1024) {
				embed.addField("🫓 Error", "https://hst.skyblockdev.repl.co/" + (await post(error)));
				embed.addField("Type", typeof evaled);
			} else {
				embed.addField("🫓 Error", `\`\`\`ts\n${error}\`\`\``);
				embed.addField("Type", typeof evaled);
			}
		}
		if (evalcode.includes("--silent")) return message.author.send(embed);
		if (evalcode.includes("--delete")) return;
		var msg = await message.util.send(embed);

		msg.react("🗑️");
		msg.react("🔁");
		msg
			.awaitReactions(
				(reaction, user) =>
					user.id == message.author.id && (reaction.emoji.name == "🗑️" || reaction.emoji.name == "🔁"),
				{
					max: 1,
					time: 60000
				}
			)
			.then((collected) => {
				if (!collected.first()) return;
				if (collected.first().emoji.name == "🗑️") {
					msg.edit(
						new MessageEmbed()
							.setTitle(`${this.client.user.tag}'s Evaled`)
							.setColor("RED")
							.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)
							.addField("🫓 Output", `\`\`\`ts\nDeleted :kekw:\`\`\``)
					);
					if (gists) {
						centra(`https://api.github.com/gists/${gists}`, "DELETE")
							.header("User-Agent", "Malil")
							.header("Authorization", `token ${process.env.gist}`)
							.send();
					}
				} else if (collected.first().emoji.name == "🔁") {
					let evaled = eval(code);
					const output = util.inspect(evaled, { depth: 0 });
					msg.edit(
						new MessageEmbed()
							.setTitle(`${this.client.user.tag}'s Evaled`)
							.setColor("RED")
							.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)
							.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``)
							.addField("Type", typeof evaled)
					);
				}
			});
		// end iof
	}
}
