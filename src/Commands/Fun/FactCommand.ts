import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
import petitio from "petitio";
export default class FactCommand extends Command {
	constructor() {
		super("fact", {
			aliases: ["fact"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 2,
			channel: "guild",
		});
	}

	async exec(message: Message): Promise<void> {
		const res = await (
			await petitio(`https://api.dagpi.xyz/data/fact`, "GET")
				.header("Authorization", this.client.credentials.dagpi)
				.header("user-agent", "Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0")
				.send()
		).json();
		message.reply(res.fact, { allowedMentions: { repliedUser: false } });
	}
}
