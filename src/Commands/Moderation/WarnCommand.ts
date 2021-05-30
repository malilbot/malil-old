import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import { GetMember, Infract } from "../../Lib/Utils";
import moment from "moment";
import { utc } from "moment";

export default class WarnCommand extends Command {
	constructor() {
		super("warn", {
			aliases: ["warn"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "member",
					type: async (message, content) => {
						const member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
				{
					id: "reason",
					type: async (_, content) => {
						return content.split(" ").slice(1).join(" ");
					},
					match: "content",
				},
			],
			description: {
				content: "WARN_DESCRIPTION_CONTENT",
				example: "WARN_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	async exec(message: Message, { member, reason }: { member: GuildMember; reason: string }): Promise<Message> {
		if (!member) return message.reply("Member not found");
		message.channel.send(`**${member.user.tag}** has been warned`);

		await member.send(`You has been Warned in **${message.guild.name}** for : \`${reason}\``).catch((e) => e);
		//* ------------------------------------ infraction code */
		Infract(message, reason, member, "WARN", this.client);
	}
}
