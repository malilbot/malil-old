import { Command } from "discord-akairo";
import { MessageEmbed, Message, Role } from "discord.js";
import { GetMember, Infract, main, sec, third } from "../../lib/Utils";
export default class UnmuteCommand extends Command {
	public constructor() {
		super("unmute", {
			aliases: ["unmute"],
			category: "Moderation",
			quoted: true,
			description: {
				content: "To unmute a user",
				usage: "unmute",
				example: ["unmute"],
			},
			args: [
				{
					id: "args",
					type: "string",
				},
			],
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }): Promise<Message> {
		if (!args) return message.util.send("No user provided");
		const user = args.split(" ")[0];
		const reason = args.split(" ").slice(1).join(" ");
		const member = await GetMember(message, user);
		if (!member) return message.util.send("User not found");

		const MRole = this.client.mutes.get(message.guild.id, `role`);
		const role: Role = message.guild.roles.cache.get(MRole) || (await message.guild.roles.fetch(MRole));

		this.client.logger.info(main(`[ STAFFUNMUTE ] ${sec(member.user.tag)} ${third(member.user.id)} [ IN ] ${sec(message.guild.name)} ${third(message.guild.id)}`));

		member.roles.remove(role, "mute duration expired");
		Infract(message, reason, member, "STAFFUNMUTE", this.client);
		return await message.util.send(`Unmuted ${member.user.username} 👍`);
	}
}
