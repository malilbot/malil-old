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

	async exec(message: Message, { size, format, member }: { member: GuildMember; size: number; format: string }): Promise<Message> {
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
	async execSlash(message: CommandInteraction) {
		const member = message.options[0]?.user ?? message.user;
		return message.reply(
			this.client.util
				.embed()
				.setTitle(`${member.username}'s Avatar`)
				.setURL(member.displayAvatarURL({ format: "png", size: 512, dynamic: true }))
				.setColor(this.client.colors.green)
				.setImage(member.displayAvatarURL({ format: "png", size: 512, dynamic: true }))
		);
	}
}
