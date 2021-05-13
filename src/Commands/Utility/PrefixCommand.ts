import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { threadId } from "worker_threads";
export default class PrefixCommand extends Command {
	public constructor() {
		super("prefix", {
			aliases: ["prefix"],
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
				content: "Set the prefix of malil in your server",
				usage: "prefix",
				example: ["prefix"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }: { args: string }): Promise<Message> {
		if (!args || args.length == 0) {
			const prefix = await this.client.db.getPrefix(message.guild.id);
			if (prefix) {
				return message.util.send(`my prefix is \`${prefix}\``);
			} else return message.util.send("my prefix is *");
		} else {
			if (!message.member.permissions.has("ADMINISTRATOR")) return message.util.send("you need to be a 'ADMINISTRATOR' to use this command");
			else if (args.includes("@")) return message.util.send("Sorry you cant use @'s in prefixes");
			this.client.db.setPrefix(message.guild.id, args);
			message.util.send(`Updated the prefix to \`${args}\``);
		}
	}
}
