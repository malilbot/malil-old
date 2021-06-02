import Command from "../../Classes/malilCommand";
import { Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class ClearWarnsCommand extends Command {
	constructor() {
		super("clearwarns", {
			aliases: ["clearwarns"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "CLEARWARNS_DESCRIPTION_CONTENT",
				example: "CLEARWARNS_DESCRIPTION_EXAMPLE",
			},
			args: [
				{
					id: "user",
					type: async (message, content) => {
						const member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
			],
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			channel: "guild",
		});
	}

	async exec(message: Message, { args, user }: { args: string; user: GuildMember }): Promise<Message> {
		if (!user) message.reply("user not found");
		this.client.deleteInfractions(user.id, message.guild.id);
		return message.reply("infractions cleared", { allowedMentions: { repliedUser: false } });
	}
}
