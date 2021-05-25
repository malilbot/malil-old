import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
import {} from "../../Lib/Utils";
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
			description: {
				content: "FACT_DESCRIPTION_CONTENT",
				example: "FACT_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 2,
			channel: "guild",
		});
	}

	async exec(message: Message): Promise<void> {
		const res = await (await petitio(`https://api.dagpi.xyz/data/fact`, "get").header("Authorization", this.client.credentials.dagpi).send()).json();
		message.util.send(res.fact, { allowedMentions: { repliedUser: false } });
	}
}
