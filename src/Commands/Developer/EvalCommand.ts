import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { inspect } from "util";
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

		let output = ''

		const gists = "";
		if (del == true) message.delete()
		const embed = new MessageEmbed()
			.setTitle(`${this.client.user.tag}'s Evaled`)
			.setColor(this.client.setting.colors.red)
			.addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``);

		try {
			output = await eval(code);
			if (typeof output !== 'string') output = inspect(output, { depth: deph || 0 });
			output = output.replace(new RegExp(this.client.setting.token, 'g'), '[HIDDEN]');
			output = output.replace(new RegExp([...this.client.setting.token].reverse().join(''), 'g'), '[HIDDEN]');
			output = output.replace(new RegExp(this.client.setting.mongoPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '[HIDDEN]');
			output = output.replace(new RegExp(this.client.setting.devtoken, 'g'), '[HIDDEN]')
			output = output.replace(new RegExp(this.client.setting.owners, 'g'), '[HIDDEN]')
			output = output.replace(new RegExp(this.client.setting.TestServer, 'g'), '[HIDDEN]')
			output = output.replace(new RegExp("\\" + this.client.setting.prefix, 'g'), '[HIDDEN]')
			output = output.replace(new RegExp(this.client.setting.gist, 'g'), '[HIDDEN]')
			output = output.replace(new RegExp(this.client.setting.genius.toString(), 'g'), '[HIDDEN]');
			output = output.replace(new RegExp(this.client.setting.topgg.toString(), 'g'), '[HIDDEN]');
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
		let msg
		if (noreturn == true) msg = await message.author.send(embed);
		else msg = await message.util.reply({ embed: embed, allowedMentions: { repliedUser: false } });

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
					const output = inspect(evaled, { depth: 0 });
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
