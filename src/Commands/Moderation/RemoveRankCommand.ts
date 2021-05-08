import Command from "../../Classes/malilCommand";
import { MessageEmbed, GuildChannel, TextChannel, Message, Role } from "discord.js";
export default class RemoveRankCommand extends Command {
	public constructor() {
		super("removeRank", {
			aliases: ["rmrank", "removeRank", "delrank", "rrank"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "role",
					type: (message: Message, content: string) => {
						if (!content) return;
						const id = content.replace(/<|@|!|>|&|/gi, "");
						if (!id) return;
						else return message.guild.roles.cache.get(id) || message.guild.roles.cache.find((r) => r.name == content);
					},
					match: "content",
				},
			],
			description: {
				content: "Used to remove roles for users to join",
				example: ["removerank @member", "rmrank 788408438421061642"],
			},
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD"],
		});
	}

	public async exec(message: Message, { role }: { role: Role }): Promise<Message | void> {
		if (!role) return message.reply("No role specified / thats not a role");
		const ranks = this.client.guilddata.ensure(message.guild.id, [], "ranks");

		for (let i = 0; i < ranks.length; i++) {
			if (ranks[i] === role.id) {
				ranks.splice(i, 1);
			}
		}
		this.client.guilddata.set(message.guild.id, ranks, "ranks");
		message.reply(`Removed ${role} to available ranks`);
	}
}
