import { Command } from "discord-akairo";
import { MessageEmbed, Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class ClearWarnsCommand extends Command {
	public constructor() {
		super("clearwarns", {
			aliases: ["clearwarns"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "clear a user's warning",
				usage: "clearwarns",
				example: ["clearwarns"],
			},
			args: [
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
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

	public async exec(message: Message, { args, user }: { args: string; user: GuildMember }): Promise<Message> {
		if (!user) message.util.send("user not found");
		this.client.infractions.delete(message.guild.id, user.id);
		return message.util.send("infractions cleared", { allowedMentions: { repliedUser: false } });
	}
}
