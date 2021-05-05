import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ms } from "../../Lib/Utils";
export default class SlowmodeCommand extends Command {
	public constructor() {
		super("slowmode", {
			aliases: ["slowmode", "sm"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "To change the slowmode of a channel",
				usage: "slowmode",
				example: ["slowmode"],
			},
			clientPermissions: ["MANAGE_CHANNELS", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message, { args }): Promise<Message> {
		return message.util.send("Sorry this command is currently disabled due to djs issues");
		const Embed = new MessageEmbed().setColor(this.client.colors.purple).setTimestamp();

		if (args == "none" || args == "off") {
			Embed.setAuthor("Slowmode has been turned off");
			message.channel.setRateLimitPerUser(0);
		} else {
			let time = 0;
			if (ms(args) > 21600001) {
				time = 21600000;
				Embed.setFooter("Cant go above 6 hours per message");
			} else {
				time = ms(args);
			}
			if (!time) return message.util.send("Invalid syntax please use slowmode 1m || slowmode off");
			message.channel.setRateLimitPerUser(time / 1000).catch(() => message.util.send("Sorry something went wrong"));
			const longtime = ms(ms(args), { long: true });

			Embed.setAuthor(`slowmode has been set to ${longtime} per message`);
		}

		return message.util.send({
			embed: Embed,
			allowedMentions: { repliedUser: false },
		});
	}
}
