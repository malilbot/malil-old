import Command from "../../Classes/malilCommand";
import { GetMember } from "../../Lib/Utils";
import { GuildMember, TextChannel } from "discord.js";
import { MessageEmbed, Message, GuildChannel } from "discord.js";

export default class modstatsCommand extends Command {
	constructor() {
		super("modstats", {
			aliases: ["modstats"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
						else return message.member;
					},
					match: "content",
				},
			],
			description: {
				content: "See your moderation stats 🕶️",

				example: ["modstats @rick"],
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			channel: "guild",
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
		if (!user) return message.reply("User not found");
		const infractions = await this.client.db.getModActions(user.id, message.guild.id);
		const warns = infractions.filter((i) => i.type.toLowerCase() == "warn");
		const bans = infractions.filter((i) => i.type.toLowerCase() == "ban");
		const kicks = infractions.filter((i) => i.type.toLowerCase() == "kick");
		const mutes = infractions.filter((i) => i.type.toLowerCase() == "mute");
		const embed = this.client.util
			.embed()
			.setAuthor(user.user.tag, user.user.avatarURL())
			.setColor(this.client.colors.orange)
			.addField("Warns ( all time ):", warns?.length || 0)
			.addField("Bans ( all time ):", bans?.length || 0)
			.addField("Kicks ( all time ):", kicks?.length || 0)
			.addField("Mutes ( all time ):", mutes?.length || 0);
		message.reply(embed);
	}
}
