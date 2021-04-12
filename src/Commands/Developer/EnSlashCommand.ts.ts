import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";
import { stripIndents } from "common-tags";
export default class EnSlashCommand extends Command {
	public constructor() {
		super("EnSlash", {
			aliases: ["EnSlash"],
			category: "Developer",
			quoted: true,

			description: {
				content: "Enabled slash command in the guild cant be reversed!!!",
				usage: "EnSlash",
				example: ["EnSlash"],
			},
			args: [
				{
					id: "global",
					type: "boolean",
					match: "flag",
					flag: ["--global", "-g"],
				},
			],
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	public async exec(message: Message, { global }: { global: boolean }) {
		try {
			//@ts-ignore
			if (global == true) {
				//@ts-expect-error
				for (let cmd of this.client.slashHandler.modules) {
					//@ts-ignore
					this.client.api //@ts-ignore so many fucking errors
						.applications(this.client.user.id)
						.commands.post({
							data: cmd[1].data,
						});
				}
			}
			//@ts-expect-error
			for (let cmd of this.client.slashHandler.modules) {
				//@ts-ignore
				this.client.api //@ts-ignore so many fucking errors
					.applications(this.client.user.id)
					.guilds(message.guild.id)
					.commands.post({
						data: cmd[1].data,
					});
			}
			return message.reply(":ok_hand:");
		} catch (e) {
			return message.reply(
				`This server hasnt added the slash command permission to me yet\n` +
					`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`
			);
		}
	}
}
