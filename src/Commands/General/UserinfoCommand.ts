import moment from "moment";
import Command from "../../Classes/malilCommand";
import type { Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class UserinfoCommand extends Command {
	constructor() {
		super("userinfo", {
			aliases: ["userinfo", "u", "user"],
			category: "General",
			quoted: true,
			slash: true,
			args: [
				{
					id: "user",
					type: GetMember,
					match: "content",
				},
			],
			options: [
				{
					type: 6,
					name: "user",
					description: "The user you need info about",
					required: false,
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	exec(message: Message, { member = message.member }: { member: GuildMember }): Promise<Message> {
		const flags = {
			DISCORD_EMPLOYEE: "Discord Employee",
			DISCORD_PARTNER: "Discord Partner",
			BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
			BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
			HYPESQUAD_EVENTS: "HypeSquad Events",
			HOUSE_BRAVERY: "House of Bravery",
			HOUSE_BRILLIANCE: "House of Brilliance",
			HOUSE_BALANCE: "House of Balance",
			EARLY_SUPPORTER: "Early Supporter",
			TEAM_USER: "Team User",
			SYSTEM: "System",
			VERIFIED_BOT: "Verified Bot",
			VERIFIED_DEVELOPER: "Verified Bot Developer",
		};

		const userFlags = member.user.flags?.toArray();
		const embed = this.client.util
			.embed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || "BLUE")
			.addField(
				"User",
				[
					`**❯ Username:** ${member.user.username}`,
					`**❯ Discriminator:** ${member.user.discriminator}`,
					`**❯ ID:** ${member.id}`,
					`**❯ Flags:** ${userFlags?.length ? userFlags.map((flag) => flags[flag]).join(", ") : "None"}`,
					`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
					`**❯ Time Created:** ${moment(member.user.createdTimestamp).format("LT")} ${moment(member.user.createdTimestamp).format("LL")} ${moment(member.user.createdTimestamp).fromNow()}`,
					//`**❯ Game:** ${member.user.presence || 'Not playing a game.'}`,
					`\u200b`,
				].join("\n")
			)
			.addField(
				"Member",
				[
					`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest.name}`,
					`**❯ Server Join Date:** ${moment(member.joinedAt).format("LL LTS")}`,
					`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`,
					`\u200b`,
				].join("\n")
			);
		return message.reply(embed);
	}
}
