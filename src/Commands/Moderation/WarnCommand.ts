import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import { GetMember, Infract } from "../../Lib/Utils";
import moment from "moment";
import { utc } from "moment";

export default class WarnCommand extends Command {
	public constructor() {
		super("warn", {
			aliases: ["warn"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "reason",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "To warn a user",
				usage: "warn",
				example: ["warn"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	public async exec(message: Message, { reason }): Promise<Message> {
		const split = reason.split(" ");
		reason = split.slice(1).join(" ");

		const user = await GetMember(message, reason);
		if (!user) return message.util.send("please mention a user");

		await user.send(`You has been Warned in **${message.guild.name}** for : \`${reason}\``).catch((e) => message.util.send("Couldnt send a message to this usser but he has been warned"));
		//* ------------------------------------ infraction code */
		Infract(message, reason, user, "WARN", this.client);
	}
}
