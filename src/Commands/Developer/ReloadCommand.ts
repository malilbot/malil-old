import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
//import { manager } from "../../index"
import { exec } from "child_process"
export default class ReloadCommand extends Command {
	public constructor() {
		super("reload", {
			aliases: [
				"reload", "update", "refresh", "pull", "updat"
			],
			category: "Developer",
			quoted: true,
			description: {
				content: "",
				usage: "reload",
				example: [
					"reload"
				]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true
		});
	}

	public async exec(message: Message) {
		const msg = await message.reply("Reloading :robot:", { allowedMentions: { repliedUser: false } });
		exec("git pull", async (error, stdout) => {

			msg.edit("```" + stdout + "```");

			exec("yarn rm", async (error, stdout) => {

				msg.edit("```" + stdout + "```");

				exec("npx tsc", async (error, stdout) => {
					if (stdout) {
						await msg.edit("```" + stdout + "```");
					}
					await msg.edit("restarting now").then(() => this.client.shard.respawnAll())

				})
			})
		})
	}
}
