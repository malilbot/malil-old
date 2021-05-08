import Command from "../../Classes/malilCommand";
import { Message, Role } from "discord.js";
export default class RankCommand extends Command {
	public constructor() {
		super("rank", {
			aliases: ["rank", "joinrank", "ranks", "quitrank"],
			category: "General",
			description: {
				content: "Join a rank use the command without arguments to see all the available ranks",
				example: ["ranks", "joinrank admin"],
			},
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
			clientPermissions: ["SEND_MESSAGES", "MANAGE_ROLES"],
			ownerOnly: false,
			ratelimit: 3,
		});
	}

	public async exec(message: Message, { role }: { role: Role }): Promise<void | Message> {
		if (role) {
			const ranks = this.client.guilddata.ensure(message.guild.id, [], "ranks");
			if (ranks.includes(role.id)) {
				if (message.member.roles.cache.has(role.id)) {
					message.member.roles.remove(role.id).catch((e) => {
						return message.reply("Sorry i dont have enough permissions to remove your rank");
					});
					return message.reply(`Succesfully left rank ${role}`);
				} else {
					message.member.roles.add(role.id).catch((e) => {
						return message.reply("Sorry i dont have enough permissions to add your rank");
					});
					return message.reply(`Succesfully joined rank ${role}`);
				}
			}
		}
		const rankA = this.client.guilddata.ensure(message.guild.id, [], "ranks");
		const ranks = rankA.map((r) => `${message.guild.roles.cache.get(r)}`);
		const embed = this.client.util
			.embed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.addField("Available ranks", ranks || "No ranks yet go make some")
			.setColor(this.client.colors.default);
		return message.reply(embed);
	}
}
