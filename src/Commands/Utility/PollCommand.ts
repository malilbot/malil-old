import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { fixword } from "../../Lib/Utils";
export default class PollCommand extends Command {
	constructor() {
		super("poll", {
			aliases: ["poll"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "Please input some code",
				},
			],
			description: {
				content: "POLL_DESCRIPTION_CONTENT",
				example: "POLL_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
		});
	}

	async exec(message: Message, { args }: { args: string }): Promise<Message> {
		const input = await fixword(args);
		if (!input) return message.reply("pelase ask a question");

		const dataEmbed = {
			title: input,
			description: `Vote with 👍 or 👎`,
			color: `GREEN`,
			footer: {
				text: `requested by ${message.author.tag}`,
				icon_url: "",
			},
		};

		try {
			message.channel
				.send({ embed: dataEmbed })
				.then(function (message) {
					message.react("👍");
					message.react("👎");
				})
				.catch(function () {
					//Something
				});
		} catch (error) {
			error;
		}
	}
}
