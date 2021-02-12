import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import * as db from "quick.db";

export default class PpCommand extends Command {
	public constructor() {
		super("pp", {
			aliases: [
				"pp"
			],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "member",
					type: "member",
					match: "rest",
					default: (msg: Message) => msg.member
				}
			],
			description: {
				content: "pp command",
				usage: "pp",
				example: [
					"pp @someone"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { member }) {
		let pp;
		if (db.fetch(`member.${member.id}.pp`)) {
			pp = db.fetch(`member.${member.id}.pp`);
		} else {
			var phrases = [
				"ur a women",
				"8D Smoll",
				"8=D",
				"8==D",
				"8===D",
				"8====D",
				"8=====D Average Sizer",
				"8======D",
				"8=======D",
				"8========D",
				"8=========D",
				"8==========D BBC Right Here"
			];
			pp = phrases[Math.floor(Math.random() * phrases.length)];
			db.set(`member.${member.id}.pp`, pp);
		}
		const embed = new MessageEmbed()
			.setTitle(`Penis Calculator`)
			.setDescription(`${pp}\n\n${member}'s Penis Size.`)
			.setColor(this.client.setting.colors.default)
		message.channel.send(embed);
	}
}
