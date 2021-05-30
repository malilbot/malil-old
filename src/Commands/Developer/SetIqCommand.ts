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
						const member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
			],
			description: {
				content: "NO",
				example: "NO",
			},
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	async exec(message: Message, { args, member }: { args: string; member: GuildMember }): Promise<Message> {
		if (!args) return message.reply("No args provided.");
		const _args = args.split(" ");
		if (!args[1]) return message.reply("No iq provided.");
		if (!member) return message.reply("No user provided.");
		const iq = parseInt(_args[1]);
		if (!iq) return message.reply("Thats not a number.");
		if (iq < 0 || iq > 150) return message.reply("You cant have a number more than 150 and less than 0 use eval to bypass this limit.");
		message.reply(`Succesfully changed ${member.user.tag}'s iq.`);
	}
}
