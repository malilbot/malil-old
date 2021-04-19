import { Command } from "discord-akairo";
import { GetMember } from "../../Lib/Utils";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class InfractionsCommand extends Command {
	public constructor() {
		super("infractions", {
			aliases: ["infractions", "warns", "warnings"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "check a user's warnings",
				usage: "infractions",
				example: ["infractions"],
			},
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
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	public async exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
		if (!user) return message.util.send("user not found");
		const usID = user.id;
		this.client.infractions.ensure(message.guild.id, { [usID]: {} });
		const infractions = this.client.infractions.get(message.guild.id, usID);
		let mesg = "";
		Object.keys(infractions).forEach((key) => {
			mesg += "**Reason:** " + infractions[key].reason + "\n**Type:** " + `${infractions[key].type.toLowerCase()}\n` + "**Mod:** ";
			+infractions[key].who + "\n";
			+"----------------------------\n";
		});
		if (mesg.length < 6) {
			return message.util.send("user doesnt have any infractions");
		}
		const embed = new MessageEmbed().setColor(this.client.consts.colors.default);
		if (mesg.length > 1024) {
			embed.addField("warns of " + user, await hst(mesg));
		} else embed.addField("warns of " + user, mesg);

		return message.util.send({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
