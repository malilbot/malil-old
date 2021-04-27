import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
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
					id: "del",
					type: "boolean",
					match: "flag",
					flag: ["--delete", "-d"],
				},
				{
					id: "global",
					type: "boolean",
					match: "flag",
					flag: ["--global", "-g"],
				},
			],
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	public async exec(message: Message, args) {
		const del = args.del;
		const global = args.global;
		try {
			//@ts-ignore
			if (global == true) {
				if (del == true) {
					//@ts-ignore so many fucking errors
					const res = this.client.api //@ts-ignore so many fucking errors
						.applications(this.client.user.id)

						.commands.get();
					for (let cmd of await res) {
						console.log(cmd.id);
						//@ts-ignore
						this.client.api //@ts-ignore so many fucking errors
							.applications(this.client.user.id)
							.commands(cmd.id)
							.delete();
					}
				} else {
					//@ts-expect-error
					for (let cmd of this.client.slashHandler.modules) {
						this.client.application.commands.create(cmd[1].data);
					}
				}
			} else {
				if (del == true) {
					//@ts-ignore so many fucking errors
					const res = this.client.api //@ts-ignore so many fucking errors
						.applications(this.client.user.id)
						.guilds(message.guild.id)
						.commands.get();
					for (let cmd of await res) {
						//@ts-ignore
						this.client.api //@ts-ignore so many fucking errors
							.applications(this.client.user.id)
							.guilds(message.guild.id)
							.commands(cmd.id)
							.delete();
					}
				} else {
					//@ts-expect-error
					for (let cmd of this.client.slashHandler.modules) {
						message.guild.commands.create(cmd[1].data);
					}
				}
			}

			return message.reply(":ok_hand:");
		} catch (e) {
			console.log(e);
			return message.reply(
				`This server hasnt added the slash command permission to me yet\n` +
					`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`
			);
		}
	}
}
