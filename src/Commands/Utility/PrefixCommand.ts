import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { threadId } from "worker_threads";
export default class PrefixCommand extends Command {
	constructor() {
		super("prefix", {
			aliases: ["prefix", "setprefix"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "PREFIX_DESCRIPTION_CONTENT",
				example: "PREFIX_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { args }: { args: string }): Promise<Message> {
		if (!args || args.length == 0) {
			const prefix = await this.client.getPrefix(message.guild.id);
			if (prefix) {
				return message.reply(`my prefix is \`${prefix}\``);
			} else return message.reply("my prefix is *");
		} else {
			if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("you need to be a 'ADMINISTRATOR' to use this command");
			else if (args.includes("@")) return message.reply("Sorry you cant use @'s in prefixes");
			this.client.setPrefix(message.guild.id, args);
			message.reply(`Updated the prefix to \`${args}\``);
		}
	}
}
