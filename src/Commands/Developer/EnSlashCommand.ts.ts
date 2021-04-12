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
			ratelimit: 3,
			channel: "guild",
			superUserOnly: true,
		});
	}

	public async exec(message: Message) {
		try {
			//@ts-ignore
			for (let cmd of this.client.slashHandler.modules) {
				//@ts-ignore
				this.client.api //@ts-ignore so many fucking errors
					.applications(this.client.user.id)
					.guilds(message.guild.id)
					.commands.post({
						data: cmd[1].data,
					});
			}
			return message.reply("Enabled the slash commands in this server");
		} catch (e) {
			return message.reply(
				`This server hasnt added the slash command permission to me yet\n` +
					`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`
			);
		}
	}
}
