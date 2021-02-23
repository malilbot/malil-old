import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import util from "util";
import centra from "centra";
import { hst } from "../../lib/Utils"

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
			ratelimit: 1,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest",
					default: "Please input some code"
				},
				{
					id: 'noreturn',
					type: 'boolean',
					match: 'flag',
					flag: ['--noreturn', '-nr', "--silent", "-s"],
				},
				{
					id: 'deph',
					type: 'number',
					match: 'option',
					flag: ['--depth', '-i'],
				},
				{
					id: 'del',
					type: 'boolean',
					match: 'flag',
					flag: ['--delete', '-d'],
				}
			],
			ownerOnly: true,
			channel: "guild"
		});
	}
	public async exec(message: Message, { code, noreturn, del, deph }: { code: string, noreturn: boolean, del: boolean, deph: number }) {

		let evaled = ''

		const evalcode = code;

		const gists = "";
		if (del == true) message.delete()
		const embed = new MessageEmbed()
			.setTitle(`${this.client.user.tag}'s Evaled`)
			.setColor(this.client.setting.colors.red)
			.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``);

		try {
			evaled = await eval(code);

			const output = util.inspect(evaled, { depth: deph || 0 });
			if (output.length > 1024) {
				embed.addField("🫓 Output", await hst(output));
				embed.addField("Type", typeof evaled);
			} else {
				embed.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``);
				embed.addField("Type", typeof evaled);
			}
		} catch (e) {
			const error = e;
			if (error.length > 1024) {
				embed.addField("🫓 Error", "https://hst.skyblockdev.repl.co/" + await hst(error));
				embed.addField("Type", typeof evaled);
			} else {
				embed.addField("🫓 Error", `\`\`\`ts\n${error}\`\`\``);
				embed.addField("Type", typeof evaled);
			}
		}
		let msg
		if (noreturn == true) msg = await message.author.send(embed);
		else msg = await message.util.send(embed);

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
							.setColor(this.client.setting.colors.red)
							.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)
							.addField("🫓 Output", `\`\`\`ts\nDeleted :kekw:\`\`\``)
					);
					if (gists) {
						centra(`https://api.github.com/gists/${gists}`, "DELETE")
							.header("User-Agent", "Malil")
							.header("Authorization", `token ${this.client.setting.gist}`)
							.send();
					}
				} else if (collected.first().emoji.name == "🔁") {
					const evaled = eval(code);
					const output = util.inspect(evaled, { depth: 0 });
					msg.edit(
						new MessageEmbed()
							.setTitle(`${this.client.user.tag}'s Evaled`)
							.setColor(this.client.setting.colors.red)
							.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)
							.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``)
							.addField("Type", typeof evaled)
					);
				}
			});
	}
}
