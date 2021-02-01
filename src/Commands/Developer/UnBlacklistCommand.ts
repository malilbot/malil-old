import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class UnBlacklistCommand extends Command {
	public constructor() {
		super("unblacklist", {
			aliases: [
				"unblacklist",
				"-blacklist"
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
				content: "unblacklist's a user",
				usage: "unblacklist",
				example: [
					"unblacklist"
				]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true
		});
	}

	public async exec(message: Message, { args, user }) {
		const id = user ? user.id : args;
		let list = this.client.blacklist.get("blacklisted", "list");

		for (var i = 0; i < list.length; i++) {
			if (list[i] == id) {
				list.splice(i, 1);
			}
		}

		// console.log(this.client.blacklist.set('blacklisted', newlist, 'list'))
		console.log(list);
		console.log(this.client.blacklist.get("blacklisted", "list"));
	}
}
