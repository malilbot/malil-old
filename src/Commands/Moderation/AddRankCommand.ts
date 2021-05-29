import Command from "../../Classes/malilCommand";
import { MessageEmbed, GuildChannel, TextChannel, Message, Role, CommandInteraction } from "discord.js";
import { GuildMember } from "discord.js";
export default class AddRankCommand extends Command {
	constructor() {
		super("addrank", {
			aliases: ["addRank", "addr", "arank", "rankadd"],
			category: "Moderation",
			quoted: true,
			slash: true,
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
			options: [
				{
					type: 8,
					name: "role",
					description: "Role to add as available ranks",
					required: true,
				},
			],
			description: {
				content: "ADDRANK_DESCRIPTION_CONTENT",
				example: "ADDRANK_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD"],
		});
	}

	async exec(message: Message, { role }: { role: Role | string }): Promise<Message | void> {
		if (!role) return message.reply("No role specified / thats not a role");
		if (!role?.id) role = message.guild.roles.cache.get(<string>role);
		this.client.guilddata.ensure(message.guild.id, [], "ranks");
		this.client.guilddata.push(message.guild.id, role.id || role, "ranks");
		message.reply(`Added ${role} to available ranks`);
	}
}
