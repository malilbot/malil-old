//import Command from "../../Classes/malilCommand";
import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, ImageSize, AllowedImageFormat, CommandInteraction } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class AvatarCommand extends Command {
	constructor() {
		super("avatar", {
			aliases: ["avatar", "av"],
			category: "Info",
			slash: true,
			description: {
				content: "AVATAR_DESCRIPTION_CONTENT",
				example: "AVATAR_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			args: [
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
				{
					id: "size",
					type: (_: Message, str: string): null | number => {
						if (str && !isNaN(Number(str)) && [16, 32, 65, 128, 256, 512, 1024, 2048, 4096].includes(Number(str))) return Number(str);
						return null;
					},
					match: "option",
					flag: ["size="],
					default: 4096,
				},
				{
					id: "format",
					type: (_: Message, str: string) => {
						if (str && String(str) && ["png", "webp", "jpg", "jpeg", "gif"].includes(String(str))) return String(str);
					},
					match: "option",
					flag: "format=",
				},
			],
			options: [
				{
					type: 6,
					name: "user",
					description: "User you want the avatar of",
					required: false,
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			channel: "guild",
		});
	}

	async exec(message: Message, { size, format, user }: { user: GuildMember; size: number; format: string }): Promise<Message> {
		return message.reply(
			new MessageEmbed()
				.setTitle(`${user.user.username}'s Avatar`)
				.setURL(
					user.user.displayAvatarURL({
						format: format as AllowedImageFormat,
						size: size as ImageSize,
						dynamic: true,
					})
				)
				.setColor(this.client.colors.blue)
				.setImage(
					user.user.displayAvatarURL({
						format: format as AllowedImageFormat,
						size: size as ImageSize,
						dynamic: true,
					})
				)
		);
	}
}
