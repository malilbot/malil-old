import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
//import { manager } from "../../index"
import { hst } from "../../lib/Utils";
import { exec } from "child_process";
export default class ReloadCommand extends Command {
	public constructor() {
		super("reload", {
			aliases: ["reload", "update", "refresh", "pull", "updat", "restart"],
			category: "Developer",
			quoted: true,
			description: {
				content: "",
				usage: "reload",
				example: ["reload"],
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	public async exec(message: Message) {
		let rs: string;
		if (message.util.parsed.alias == "restart") rs = "restarting";

		const embed = new MessageEmbed().setTitle(`${rs ? "restart time" : "Update time"}`).setColor(this.client.consts.colors.green);
		embed.addField("\u200B", rs || "Updating <a:updating:824662408239906897>");
		//const msg = await message.reply("Updating <a:updating:824662408239906897>", { allowedMentions: { repliedUser: false } });
		const msg = await message.reply({ embed, allowedMentions: { repliedUser: false } });

		if (rs) {
			embed.addField("\u200B", "restarting now <a:updating:824662408239906897>");
			await msg.edit({ embed, allowedMentions: { repliedUser: false } }).then(() => this.client.shard.respawnAll());
		}

		exec("git pull", async (e, stdout) => {
			let _stdout: string;
			if (stdout.length > 1024) {
				_stdout = await hst(stdout);
			} else {
				_stdout = "```" + stdout + "```\n";
			}
			let ghMSG = "Running git pull <:github:824673035499733022>\n";
			if (stdout.includes("Already up to date.")) {
				_stdout = "";
				ghMSG = "Git pulled no new commits <:github:824673035499733022>\n";
			}
			embed.addField("\u200B", ghMSG + _stdout);
			msg.edit({ embed, allowedMentions: { repliedUser: false } });
			if (_stdout == "") {
				exec("npx tsc", async () => {
					embed.addField("\u200B", "Reloading <a:updating:824662408239906897>");
					await msg.edit({ embed, allowedMentions: { repliedUser: false } }).then(() => this.client.shard.respawnAll());
				});
			} else {
				exec("yarn rm", () => {
					embed.addField("\u200B", "Deleting the Dist folder <:join_arrow:824668785163894845>");
					msg.edit({ embed, allowedMentions: { repliedUser: false } });

					exec("npx tsc", async () => {
						embed.addField("\u200B", "Reloading <a:updating:824662408239906897>");
						await msg.edit({ embed, allowedMentions: { repliedUser: false } }).then(() => this.client.shard.respawnAll());
					});
				});
			}
		});
	}
}
