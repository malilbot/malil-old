import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class BlacklistCommand extends Command {
	public constructor() {
		super("blacklist", {
			aliases: [
				"blacklist"
			],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "user",
					type: "member",
					match: "rest"
				},
				{
					id: "args",
					type: "string",
					match: "text"
				}
			],
			description: {
				content: "blacklist's a user",
				usage: "blacklist",
				example: [
					"blacklist"
				]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true
		});
	}

	public async exec(message: Message, { args, user }) {
		const id = user ? user.id : args;
		this.client.blacklist.push("blacklisted", id, "list");
	}
}
