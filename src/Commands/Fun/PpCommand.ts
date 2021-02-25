import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import * as db from "quick.db";
import { GetUser, GetSelf } from "../../lib/Utils"
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

	public async exec(message: Message, { }) {
		const member = await GetSelf(message, this.client) || message.member
		let pp;
		this.client.UserData.ensure(message.author.id, {
			pp: '',
			iq: 0,
		})
		if (this.client.UserData.get(message.author.id, "pp")) {
			pp = this.client.UserData.get(message.author.id, "pp")
		} else {
			const phrases = [
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
			this.client.UserData.set(message.author.id, pp, "pp")
		}
		const embed = new MessageEmbed()
			.setTitle(`Penis Calculator`)
			.setDescription(`${pp}\n\n${member}'s Penis Size.`)
			.setColor(this.client.setting.colors.default)
		message.channel.send(embed);
	}
}
