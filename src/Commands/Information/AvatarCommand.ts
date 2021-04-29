import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class AvatarCommand extends Command {
	public constructor() {
		super("avatar", {
			aliases: ["avatar", "av"],
			category: "Info",
			description: {
				content: "Display your discord avatar otr other user.",
				example: ["avatar @example#1111", "avatar @example", "avatar @example size=512", "avatar @example format=png", "avatar @example size=512 format=jpg"],
			},
			ratelimit: 3,
			args: [
				{
					id: "member",
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
			clientPermissions: ["SEND_MESSAGES"],
			channel: "guild",
		});
	}

	public async exec(message: Message, { size, format, member }: { member: GuildMember; size: number; format: string }): Promise<Message> {
		return message.util.send(
			new MessageEmbed()
				.setTitle(`${member.user.username}'s Avatar`)
				.setURL(
					member.user.displayAvatarURL({
						format: format as AllowedImageFormat,
						size: size as ImageSize,
						dynamic: true,
					})
				)
				.setColor(this.client.colors.blue)
				.setImage(
					member.user.displayAvatarURL({
						format: format as AllowedImageFormat,
						size: size as ImageSize,
						dynamic: true,
					})
				)
		);
	}
}
