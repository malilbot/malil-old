import Command from "../../Classes/malilCommand";
import { CommandInteraction, Message, Role, Interaction } from "discord.js";
export default class RemoveRankCommand extends Command {
	constructor() {
		super("removerank", {
			aliases: ["rmrank", "removeRank", "delrank", "rrank"],
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
						else return message.guild.roles.cache.get(id) || message.guild.roles.cache.find((r) => r.name.toLowerCase() === content);
					},
					match: "content",
				},
			],
			description: {
				content: "DELRANK_DESCRIPTION_CONTENT",
				example: "DELRANK_DESCRIPTION_EXAMPLE",
			},
			options: [
				{
					type: 8,
					name: "role",
					description: "the role you want to remove from the ranks",
					required: true,
				},
			],
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_ROLES", "MANAGE_GUILD"],
		});
	}

	async exec(message: Message, { role }: { role: Role | string }): Promise<Message | void> {
		if (!role) return message.reply("No role specified / thats not a role");
		if (typeof role == "string") role = message.guild.roles.cache.get(<string>role);
		const ranks = this.client.guilddata.ensure(message.guild.id, [], "ranks");

		for (let i = 0; i < ranks.length; i++) {
			if (ranks[i] === role.id) {
				ranks.splice(i, 1);
			}
		}
		this.client.guilddata.set(message.guild.id, ranks, "ranks");
		message.reply(`Removed ${role} from available ranks`);
	}
	execSlash(interaction: CommandInteraction) {
		const role = interaction.options[0].role;
		const ranks = this.client.guilddata.ensure(interaction.guild.id, [], "ranks");

		for (let i = 0; i < ranks.length; i++) {
			if (ranks[i] === role.id) {
				ranks.splice(i, 1);
			}
		}
		this.client.guilddata.set(interaction.guild.id, ranks, "ranks");
		interaction.reply(`Removed ${role} from available ranks`);
	}
}
