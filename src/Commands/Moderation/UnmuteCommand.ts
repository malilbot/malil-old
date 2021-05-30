import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, Role, Guild, GuildManager, GuildMember } from "discord.js";
import { GetMember, Infract, main, sec, third } from "../../Lib/Utils";
export default class UnmuteCommand extends Command {
	constructor() {
		super("unmute", {
			aliases: ["unmute"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "UNMUTE_DESCRIPTION_CONTENT",
				example: "UNMUTE_DESCRIPTION_EXAMPLE",
			},
			args: [
				{
					id: "args",
					type: "string",
				},
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
		if (!args) return message.reply("No user provided");

		const reason = args.split(" ").slice(1).join(" ");
		if (!user) return message.reply("User not found");

		const MRole = this.client.mutes.get(message.guild.id, `role`);
		const role: Role = message.guild.roles.cache.get(MRole) || (await message.guild.roles.fetch(MRole));

		this.client.logger.info(main(`[ STAFFUNMUTE ] ${sec(user.user.tag)} ${third(user.user.id)} [ IN ] ${sec(message.guild.name)} ${third(message.guild.id)}`));

		user.roles.remove(role, "User was unmuted by a staff member");
		Infract(message, reason, user, "STAFFUNMUTE", this.client);
		return await message.reply(`Unmuted ${user.user.username} 👍`);
	}
}
