import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class setiqCommand extends Command {
	public constructor() {
		super("setiq", {
			aliases: ["setiq"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "content",
					match: "rest",
				},
			],
			description: {
				content: "Set the iq of a user",
				usage: "setiq",
				example: ["setiq"],
			},
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	public async exec(message: Message, { args }): Promise<Message> {
		if (!args) return message.util.send("No args provided.");
		const _args = args.split(" ");
		if (!args[1]) return message.util.send("No iq provided.");
		const user = await GetMember(message, _args[0]);
		if (!user) return message.util.send("No user provided.");
		const iq = parseInt(_args[1]);
		if (!iq) return message.util.send("Thats not a number.");
		if (iq < 0 || iq > 150) return message.util.send("You cant have a number more than 150 and less than 0 use eval to bypass this limit.");
		this.client.UserData.set(user.user.id, iq, "iq");
		message.util.send(`Succesfully changed ${user.user.tag}'s iq.`);
	}
}
