import Command from "../../Classes/malilCommand";
import { MessageEmbed, GuildChannel, TextChannel, Message, Role, CommandInteraction } from "discord.js";
import { GuildMember } from "discord.js";
export default class AddRankCommand extends Command {
	public constructor() {
		super("addrank", {
			aliases: ["addRank", "addr", "arank", "rankadd"],
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
			options: [
				{
					type: 8,
					name: "role",
					description: "Role to add as available ranks",
					required: true,
				},
			],
			description: {
				content: "Allows you to set roles a user can join",
				example: ["addrank @member", "arank 788408438421061642"],
			},
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD"],
		});
	}

	public async exec(message: Message, { role }: { role: Role }): Promise<Message | void> {
		if (!role) return message.reply("No role specified / thats not a role");
		this.client.guilddata.ensure(message.guild.id, [], "ranks");
		this.client.guilddata.push(message.guild.id, role.id, "ranks");
		message.reply(`Added ${role} to available ranks`);
	}
	async execSlash(interaction: CommandInteraction): Promise<void> {
		const perms = (interaction.channel as TextChannel).permissionsFor(interaction.member as GuildMember).toArray();
		if (!perms.includes("MANAGE_ROLES") && !perms.includes("MANAGE_GUILD")) return interaction.reply("You dont have enough permissions to run this command");

		const role = interaction.options[0].role;
		this.client.guilddata.ensure(interaction.guild.id, [], "ranks");
		this.client.guilddata.push(interaction.guild.id, role.id, "ranks");
		await interaction.reply(`Added ${role} to available ranks`);
	}
}
