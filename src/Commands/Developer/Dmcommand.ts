import Command from "../../Classes/malilCommand";
import type { Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class DmCommand extends Command {
	constructor() {
		super("dm", {
			aliases: ["dm"],
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

	async exec(message: Message, { args, member }: { args: string; member: GuildMember }) {
		if (!member) return message.reply("User not found");
		member.send(args.split(" ").slice(1).join(" ") || "e").catch((e) => message.reply(e, { allowedMentions: { repliedUser: false } }));
		message.reply(`Dmed ${member.user.tag}`, { allowedMentions: { repliedUser: false } });
	}
}
