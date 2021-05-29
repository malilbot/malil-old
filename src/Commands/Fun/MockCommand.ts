import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class MockCommand extends Command {
	constructor() {
		super("mock", {
			aliases: ["mock", "itriedmybest", "mok"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "Me When No Arguments",
				},
			],
			description: {
				content: "MOCK_DESCRIPTION_CONTENT",
				example: "MOCK_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { args }): Promise<void> {
		// -- split the args
		const array = args.split("");
		// -- defining text
		let text = "";
		// -- foreach item
		array.forEach((item: string) => {
			text += tried(item);
		});
		// -- send the output
		message.reply((await fixword(text.replace(/@/g, "@​"))) || "try actually sending nice text");

		// -- my amazing function
		function tried(item: string): string {
			const num = Math.floor(Math.random() * 2);
			// -- if its a space return
			if (item == " ") return item;
			// -- advanced rng
			if (num == 0) {
				return item.toLowerCase();
			} else {
				return item.toUpperCase();
			}
		}
		// -- end of code tour
	}
}
