import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, MessageAttachment } from "discord.js";
import { inspect } from "util";
import { hst, InterfaceClient } from "../../Lib/Utils";
let EvalCode = "";
export default class EvalCommand extends Command {
	constructor() {
		super("eval", {
			aliases: ["eval", "ev"],
			category: "Developer",
			description: {
				content: "Some super javascript code",
				usage: "eval < javascript >",
				example: ["eval message.guild.id"],
			},
			ratelimit: 1,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest",
				},
				{
					id: "noreturn",
					type: "boolean",
					match: "flag",
					flag: ["--noreturn", "-nr", "--silent", "-s"],
				},
				{
					id: "deph",
					type: "number",
					match: "option",
					flag: ["--depth", "-i"],
				},
				{
					id: "remember",
					type: "boolean",
					match: "flag",
					flag: ["--remember", "-r"],
				},
				{
					id: "del",
					type: "boolean",
					match: "flag",
					flag: ["--delete", "-d"],
				},
			],
			ownerOnly: true,
			channel: "guild",
		});
	}
	async exec(
		message: Message,
		{
			code,
			noreturn,
			del,
			deph,
			reset,
		}: {
			code: string;
			noreturn: boolean;
			del: boolean;
			deph: number;
			reset: boolean;
		}
	): Promise<Message> {
		if (!code) return message.util.send("You cant eval air");

		if (del == true) message.delete();
		const embed = new MessageEmbed().setColor(this.client.colors.red).addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``);
		let output: string;
		let msg: Message;

		const { member, guild, channel, author, util } = message;
		if (noreturn == true) msg = await message.author.send(embed);
		else msg = await message.util.send({ embed });
		msg.react("🗑️");
		try {
			if (!reset) EvalCode = "";
			output = await eval(code);
			EvalCode += code + ";";
			if (typeof output !== "string") output = replace(inspect(output, { depth: deph || 0 }), this.client);

			if (output.length > 1024) {
				embed.addField("🫓 Output", await hst(output));
				embed.addField("Type", typeof output);
			} else {
				embed.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``);
				embed.addField("Type", typeof output);
			}
		} catch (e) {
			const error = e;
			if (error.length > 1024) {
				embed.addField("🫓 Error", await hst(error));
				embed.addField("Type", typeof output);
			} else {
				embed.addField("🫓 Error", `\`\`\`ts\n${error}\`\`\``);
				embed.addField("Type", typeof output);
			}
		}
		if (noreturn == true) msg = await message.author.send(embed);
		else msg.edit({ embed: embed, allowedMentions: { repliedUser: false } });

		msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "🗑️" || reaction.emoji.name == "🔁"), { max: 1, time: 60000 }).then((collected) => {
			if (!collected.first()) return;
			if (collected.first().emoji.name == "🗑️") {
				msg.edit(
					new MessageEmbed()
						.setTitle(`${this.client.user.tag}'s Evaled`)
						.setColor(this.client.colors.red)
						.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)
						.addField("🫓 Output", `\`\`\`ts\nDeleted :kekw:\`\`\``)
				);
			}
		});

		function replace(content: string, client: InterfaceClient) {
			return content
				.replace(new RegExp(client.credentials.token, "g"), "[HIDDEN]")
				.replace(new RegExp([...client.credentials.token].reverse().join(""), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.mongoPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.devtoken, "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.TestServer, "g"), "[HIDDEN]")
				.replace(new RegExp("\\" + client.settings.prefix, "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.github, "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.genius.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.bottokens.discordbotlist.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.dagpi.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.bottokens.Bladebnots.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.bottokens.topgg.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.bottokens.discordextreme.toString(), "g"), "[HIDDEN]")
				.replace(new RegExp(client.credentials.bottokens.botsgg.toString(), "g"), "[HIDDEN]");
		}
	}
}
