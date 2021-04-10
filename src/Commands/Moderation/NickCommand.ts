import { Command } from "discord-akairo";
import { GetMember } from "../../Lib/Utils";
import { Message } from "discord.js";

export default class NickCommand extends Command {
	public constructor() {
		super("nick", {
			aliases: ["nick", "changenick"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "name",
					type: "string",
				},
			],
			description: {
				content: "Change the nickname of a user",
				usage: "nick",
				example: ["nick"],
			},
			clientPermissions: ["MANAGE_NICKNAMES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_NICKNAMES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { name }): Promise<Message> {
		const NewName = name.split(" ").splice(1).join(" ");
		const user = await GetMember(message, name);
		if (!user) return message.util.send("user not found");
		try {
			await user.setNickname(NewName, `${message.author.tag} Used nick.`);
			return message.util.send("NickName Changed");
		} catch (err) {
			return message.util.send("Sorry cant do", { allowedMentions: { repliedUser: false } });
		}
	}
}
