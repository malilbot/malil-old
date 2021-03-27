import { Command } from "discord-akairo";
import { GetMember } from "../../lib/Utils";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import { hst } from "../../lib/Utils";
export default class InfractionsCommand extends Command {
	public constructor() {
		super("infractions", {
			aliases: ["infractions", "warns", "warnings"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "",
				usage: "infractions",
				example: ["infractions"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message) {
		const user = await GetMember(message);
		if (!user) return message.util.send("user not found");
		const usID = user.id;
		this.client.infractions.ensure(message.guild.id, { [usID]: {} });
		const infractions = this.client.infractions.get(message.guild.id, usID);
		let mesg = "";
		Object.keys(infractions).forEach((key) => {
			mesg += "**Reason:** " + infractions[key].reason + "\n**Type:** ";
			mesg += infractions[key].type + "\n**Mod:** ";
			mesg += infractions[key].who + "\n";
			mesg += "----------------------------\n";
		});
		if (mesg.length < 6) {
			return message.util.send("user doesnt have any infractions");
		}
		const embed = new MessageEmbed().setColor(this.client.consts.colors.default);
		if (mesg.length > 1024) {
			embed.addField("warns of " + user, await hst(mesg));
		} else embed.addField("warns of " + user, mesg);

		message.util.send({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
