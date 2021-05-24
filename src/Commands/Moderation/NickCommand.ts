import Command from "../../Classes/malilCommand";
import { GetMember } from "../../Lib/Utils";
import { GuildMember, Message } from "discord.js";

export default class NickCommand extends Command {
	constructor() {
		super("nick", {
			aliases: ["nick", "changenick"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "name",
					type: "string",
				},
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
			],
			description: {
				content: "NICK_DESCRIPTION_CONTENT",
				example: "NICK_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["MANAGE_NICKNAMES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_NICKNAMES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { name, user }: { name: string; user: GuildMember }): Promise<Message> {
		const NewName = name.split(" ").splice(1).join(" ");
		if (!user) return message.util.send("user not found");
		try {
			await user.setNickname(NewName, `${message.author.tag} Used nick.`);
			return message.util.send("NickName Changed");
		} catch (err) {
			return message.util.send("Sorry cant do", { allowedMentions: { repliedUser: false } });
		}
	}
}
