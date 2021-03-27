import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetMember, Infract } from "../../lib/Utils";

export default class KickCommand extends Command {
	public constructor() {
		super("kick", {
			aliases: ["kick"],
			category: "Moderation",
			description: {
				content: "To kick member on this guild",
				usage: "kick < member > ",
				example: ["kick @member"],
			},
			ratelimit: 3,

			clientPermissions: ["KICK_MEMBERS", "SEND_MESSAGES"],
			userPermissions: ["KICK_MEMBERS"],
			channel: "guild",
			args: [
				{
					id: "reason",
					type: "string",
					default: "e No reason provided....",
				},
			],
		});
	}

	public async exec(message: Message, { reason }: { user: GuildMember; reason: string }) {
		let user = await GetMember(message, reason);
		user = user as GuildMember;
		reason = reason.split(" ").slice(1).join(" ");
		if (!user) return message.util.send("user not found");
		if (!user.kickable) return message.util.send(`Sorry, i can't kick this user`);

		if (!message.member.guild.me.permissions.has(["KICK_MEMBERS"])) return message.util.send(`Sorry, i don't have permission to kick members, make sure you give me \`KICK_MEMBERS\` permission`);
		reason = reason.replace(user.id, "").replace(/<.*?>/g, "");
		user.kick().then((x) => {
			x.send(`You has been kicked from **${message.guild.name}** for reason \`${reason}\``);
			message.util.send(
				new MessageEmbed()
					.setAuthor(`User kicked by ${message.author.tag}`, message.author.avatarURL())
					.setDescription(
						`
                Name: ${x.user.tag}
                Time Kicked: ${utc(Date.now())}
                Reason: ${reason}`
					)
					.setFooter(`Sayonara~`)
					.setTimestamp()
			);
		});

		//* ------------------------------------ infraction code */
		Infract(message, reason, user, "KICK", this.client);
	}
}
