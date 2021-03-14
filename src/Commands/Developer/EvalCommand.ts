import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { inspect } from 'util';
import centra from 'centra';
import { hst } from '../../lib/Utils';
let EvalCode = '';
export default class EvalCommand extends Command {
	public constructor() {
		super('eval', {
			aliases: ['eval', 'ev'],
			category: 'Developer',
			description: {
				content: 'Some super javascript code',
				usage: 'eval < javascript >',
				example: ['eval message.guild.id'],
			},
			ratelimit: 1,
			args: [
				{
					id: 'code',
					type: 'string',
					match: 'rest',
				},
				{
					id: 'noreturn',
					type: 'boolean',
					match: 'flag',
					flag: ['--noreturn', '-nr', '--silent', '-s'],
				},
				{
					id: 'deph',
					type: 'number',
					match: 'option',
					flag: ['--depth', '-i'],
				},
				{
					id: 'remember',
					type: 'boolean',
					match: 'flag',
					flag: ['--remember', '-r'],
				},
				{
					id: 'del',
					type: 'boolean',
					match: 'flag',
					flag: ['--delete', '-d'],
				},
			],
			ownerOnly: true,
			channel: 'guild',
		});
	}
	public async exec(
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
	) {
		if(!code) return message.reply("You cant eval air")
		let output = '';
		const gists = '';
		if (del == true) message.delete();
		const embed = new MessageEmbed()
			.setTitle(`${this.client.user.tag}'s Evaled`)
			.setColor(this.client.consts.colors.red)
			.addField('🍞 Input', `\`\`\`ts\n${code}\`\`\``);

		try {
			if (!reset) EvalCode = '';
			output = await eval(
				'const { MessageEmbed } = require("discord.js");' + EvalCode + code
			);
			EvalCode += code + ';';
			if (typeof output !== 'string')
				//prettier-ignore
				output = inspect(output, { depth: deph || 0 })
					.replace(new RegExp(this.client.credentials.token, 'g'), '[HIDDEN]')
					.replace(new RegExp([...this.client.credentials.token].reverse().join(''), 'g'), '[HIDDEN]')
					.replace(new RegExp(this.client.credentials.mongoPath.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.devtoken, 'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.TestServer, 'g'),'[HIDDEN]')
					.replace(new RegExp('\\' + this.client.settings.prefix, 'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.gist, 'g'), '[HIDDEN]')
					.replace(new RegExp(this.client.credentials.genius.toString(), 'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.bottokens.discordbotlist.toString(),'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.dagpi.toString(), 'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.bottokens.Bladebnots.toString(),'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.bottokens.topgg.toString(), 'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.bottokens.discordextreme.toString(),'g'),'[HIDDEN]')
					.replace(new RegExp(this.client.credentials.bottokens.botsgg.toString(),'g'),'[HIDDEN]');
			if (output.length > 1024) {
				embed.addField('🫓 Output', await hst(output));
				embed.addField('Type', typeof output);
			} else {
				embed.addField('🫓 Output', `\`\`\`ts\n${output}\`\`\``);
				embed.addField('Type', typeof output);
			}
		} catch (e) {
			const error = e;
			if (error.length > 1024) {
				embed.addField('🫓 Error', await hst(error));
				embed.addField('Type', typeof output);
			} else {
				embed.addField('🫓 Error', `\`\`\`ts\n${error}\`\`\``);
				embed.addField('Type', typeof output);
			}
		}
		let msg;
		if (noreturn == true) msg = await message.author.send(embed);
		else
			msg = await message.util.reply({
				embed: embed,
				allowedMentions: { repliedUser: false },
			});

		msg.react('🗑️');
		msg.react('🔁');
		msg
			.awaitReactions(
				(reaction, user) =>
					user.id == message.author.id &&
					(reaction.emoji.name == '🗑️' || reaction.emoji.name == '🔁'),
				{
					max: 1,
					time: 60000,
				}
			)
			.then((collected) => {
				if (!collected.first()) return;
				if (collected.first().emoji.name == '🗑️') {
					msg.edit(
						new MessageEmbed()
							.setTitle(`${this.client.user.tag}'s Evaled`)
							.setColor(this.client.consts.colors.red)
							.addField('🍞 Input', `\`\`\`ts\n${code}\`\`\``)
							.addField('🫓 Output', `\`\`\`ts\nDeleted :kekw:\`\`\``)
					);
					if (gists) {
						centra(`https://api.github.com/gists/${gists}`, 'DELETE')
							.header('User-Agent', 'Malil')
							.header('Authorization', `token ${this.client.credentials.gist}`)
							.send();
					}
				} else if (collected.first().emoji.name == '🔁') {
					const evaled = eval(code);
					const output = inspect(evaled, { depth: 0 });
					msg.edit(
						new MessageEmbed()
							.setTitle(`${this.client.user.tag}'s Evaled`)
							.setColor(this.client.consts.colors.red)
							.addField('🍞 Input', `\`\`\`ts\n${code}\`\`\``)
							.addField('🫓 Output', `\`\`\`ts\n${output}\`\`\``)
							.addField('Type', typeof evaled)
					);
				}
			});
	}
}
