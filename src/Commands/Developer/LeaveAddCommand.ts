import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class LeaveAddCommand extends Command {
	public constructor() {
		super("leaveAdd", {
			aliases: ["leaveAdd"],
			category: "Developer",
			quoted: true,
			ownerOnly: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "add a guild to leave list",
				usage: "leaveAdd",
				example: ["leaveAdd"],
			},
			ratelimit: 3,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		this.client.blacklist.push("blacklist", args, "leavelist");
		message.util.send("Guild added to leave list " + args, { allowedMentions: { repliedUser: false } });
	}
}
