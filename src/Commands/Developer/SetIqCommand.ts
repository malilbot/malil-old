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
					type: (_, content) => content.split(" ").slice(1).join(" "),
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
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	async exec(message: Message, { args, member }: { args: string; member: GuildMember }): Promise<Message> {
		if (!member) return message.reply("No user provided.");
		const iq = parseInt(args);
		if (!iq) return message.reply("Thats not a number.");
		const newIq = await this.client.increaseIq(member.id, iq);
		message.reply(`Succesfully changed ${member.user.tag}'s iq to ${newIq}`);
	}
}
