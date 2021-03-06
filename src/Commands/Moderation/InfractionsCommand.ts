import Command from "../../Classes/malilCommand";
import { GetMember } from "../../Lib/Utils";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class InfractionsCommand extends Command {
	constructor() {
		super("infractions", {
			aliases: ["infractions", "warns", "warnings"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "INFRACTIONS_DESCRIPTION_CONTENT",
				example: "INFRACTIONS_DESCRIPTION_EXAMPLE",
			},
			args: [
				{
					id: "user",
					type: async (message, content) => {
						const member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	async exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
		if (!user?.user?.tag) return message.reply("user not found");

		const infractions = await this.client.getInfractions(user.id, message.guild.id);
		if (!infractions) {
			return message.reply("User doesnt have any infractions");
		}

		let mesg = "";
		for (const infraction of infractions) {
			mesg += "------------------------\n";
			mesg += `**Reason** ${infraction.reason}\n`;
			mesg += `**type** ${infraction.type.toLowerCase()}\n`;
		}
		if (mesg.length < 6) {
			return message.reply("user doesnt have any infractions");
		}
		const embed = new MessageEmbed().setColor(this.client.colors.default);
		if (mesg.length > 1024) {
			embed.addField("warns of " + user.user.tag, await hst(mesg));
		} else embed.addField("warns of " + user.user.tag, mesg);

		return message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
