import { Command } from "discord-akairo";
import type { Message } from "discord.js";
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

	public async exec(message: Message, { args }) {
		if (!args || args.length == 0 || args.size == 0) {
			if (this.client.prefixes.get(message.guild.id, "prefix")) {
				const item = this.client.prefixes.get(message.guild.id, "prefix");
				if (item) return message.util.send("my prefix is " + item);
			} else return message.util.send("my prefix is *");
		} else {
			if (!message.member.permissions.has("ADMINISTRATOR")) return message.util.send("you need to be a 'ADMINISTRATOR' to use this command");
			else if (args.includes("@")) return message.util.send("Sorry you cant use @'s in prefixes");
			this.client.prefixes.set(message.guild.id, args, "prefix");
			message.util.send("Updated the prefix to " + args);
		}
	}
}
