import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
export default class FloppaCommand extends Command {
	public constructor() {
		super("floppa", {
			aliases: ["floppa"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "number",
					match: "rest"
				}
			],
			description: {
				content: "floppa",
				usage: "floppa",
				example: ["floppa"]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: false
		});
	}

	public async exec(message: Message, { args }) {
		const { floor } = Math;
		const Random = (total: number) => {
			let a1 = 0,
				b1 = 0,
				c1 = 0;
			for (let i = 0; i < total; i++) {
				const num = Math.floor(Math.random() * 3) + 1;
				if (num == 1) a1++;
				if (num == 2) b1++;
				if (num == 3) c1++;
			}
			return [a1, b1, c1];
		};
		class Floppa {
			static makemore() {
				2 + 2;
			}
			floppas: number;
			constructor(floppas: number) {
				this.floppas = floppas;
			}
			public makemore() {
				const floppa = Random(this.floppas);
				const floppaObject = {
					young: floppa[0],
					good: floppa[1],
					old: floppa[2],
					born: null
				};
				const babys = floppaObject.good / 2;
				floppaObject["born"] = babys;
				return floppaObject;
			}
		}
		if (typeof args !== "number") return message.reply("not a number");
		if (args > 5000) return message.reply("cant handle too many floppas srry");
		const floppa = await new Floppa(args);
		const floppas = await floppa.makemore();
		const embed = new MessageEmbed()
			.setAuthor("tricked floppa's machine")
			.addField(
				"stats",
				`${floppas.young} young floppas were made\n${floppas.good} adult floppas were made\n${floppas.old} old floppas were made \n${floor(floppas.born)} baby floppas were born`
			);
		message.reply(embed);
	}
}
