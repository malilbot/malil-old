import Command from "../../Classes/malilCommand";
import { GetMember } from "../../Lib/Utils";
import { GuildMember, TextChannel } from "discord.js";
import { MessageEmbed, Message, GuildChannel } from "discord.js";

export default class modstatsCommand extends Command {
	public constructor() {
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
					},
					match: "content",
				},
			],
			description: {
				content: "Make a channel modeonly aka only people with manage messages can use commands there",
				usage: "modonly",
				example: ["modonly", "modonly #channel", "modonly <channel id>", "modonly get"],
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
			channel: "guild",
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
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
