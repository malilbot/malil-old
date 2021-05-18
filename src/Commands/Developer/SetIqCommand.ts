import Command from "../../Classes/malilCommand";
import type { GuildMember, Message } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class setiqCommand extends Command {
	constructor() {
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
				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
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

	async exec(message: Message, { args, member }: { args: string; member: GuildMember }): Promise<Message> {
		if (!args) return message.util.send("No args provided.");
		const _args = args.split(" ");
		if (!args[1]) return message.util.send("No iq provided.");
		if (!member) return message.util.send("No user provided.");
		const iq = parseInt(_args[1]);
		if (!iq) return message.util.send("Thats not a number.");
		if (iq < 0 || iq > 150) return message.util.send("You cant have a number more than 150 and less than 0 use eval to bypass this limit.");
		message.util.send(`Succesfully changed ${member.user.tag}'s iq.`);
	}
}
