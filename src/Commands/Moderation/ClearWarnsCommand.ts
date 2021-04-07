import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
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
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		const user = await GetMember(message, args);
		if (!user) message.util.send("user not found");
		this.client.infractions.delete(message.guild.id, user.id);
		message.util.send("infractions cleared", { allowedMentions: { repliedUser: false } });
	}
}
