import { Listener } from "discord-akairo";
import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, GuildChannel, TextChannel } from "discord.js";
import { utc } from "moment";
import { GetMember, Infract } from "../../Lib/Utils";
export default class BanCommand extends Command {
	public constructor() {
		super("ban", {
			aliases: ["ban", "bang"],
			category: "Moderation",
			description: {
				content: "To ban members on this guild",
				usage: "ban < member >",
				example: ["ban @member", "ban @member 7"],
			},
			channel: "guild",
			ratelimit: 3,
			clientPermissions: ["BAN_MEMBERS", "SEND_MESSAGES"],
			userPermissions: ["BAN_MEMBERS"],
			args: [
				{
					id: "day",
					type: (_: Message, str: string): null | number => {
						if (str && !isNaN(Number(str)) && [0, 1, 2, 3, 4, 5, 7].includes(Number(str))) return Number(str);
						return null;
					},
					default: 0,
				},
				{
					id: "reason",
					type: "strin",
					default: "e No reason provided...",
				},
			],
		});
	}

	public async exec(message: Message, { day, reason }: { user: GuildMember; day: number; reason: string }): Promise<Message> {
		const user = await GetMember(message, reason);
		if (!user) return message.util.send("user not found");
		reason = reason.split(" ").slice(1).join(" ");
		if (!user.bannable) return message.util.send(`Sorry, i can't ban this user`);

		try {
			await user.send(`You has been banned from **${message.guild.name} for reason: \`${reason}\``);
		} catch (err) {
			message.reply(err);
		}

		await message.guild.members.ban(user, { days: day, reason });

		message.util.send(
			new MessageEmbed()
				.setAuthor(`User Banned by ${message.author.tag}`, message.author.avatarURL())
				.setThumbnail(user.user.avatarURL())
				.setDescription(`Name: ${user.user.tag}\n` + `Time: ${utc(Date.now())}\n` + `Reason: ${reason}`)
				.setFooter(`Sayonara~`)
				.setTimestamp()
		);
		this.client.infractions.ensure(message.guild.id, {});

		//* ------------------------------------ infraction code */
		Infract(message, reason, user, "BAN", this.client);
	}
}
