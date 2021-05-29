import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";
import { exec } from "child_process";
import { ms, Util } from "../../Lib/Utils";
import os from "os";
export default class LoadCommand extends Command {
	constructor() {
		super("load", {
			aliases: ["load"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "NO",
				example: "NO",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			ownerOnly: true,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async exec(message: Message): Promise<void> {
		const ut = new Util();

		const totalGuilds = await this.client.shard.fetchClientValues("guilds.cache.size").then((serv) => serv.reduce((acc, guildCount) => acc + guildCount, 0));
		const totalMembers = await this.client.shard
			.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)")
			.then((member) => member.reduce((acc, memberCount) => acc + memberCount, 0));
		//cpuUsage((v: number) => {
		exec("ps -e | wc -l", async (error, stdout) => {
			const processes = stdout;
			exec("free -m | grep Mem", async (error, stdout) => {
				const memory = stdout.trim().split(" ")[20];
				exec("cat /sys/class/thermal/thermal_zone0/temp", async (error, stdout) => {
					const temps = Number(stdout);
					const sysStats = "```\n" + `Uptime ${ms(os.uptime() * 1000, { long: true })}, processes ${processes}` + `CPU Heat ${temps / 1000} C\n` + `Ram used: ${memory} MB\n` + "```\n";
					const botStats =
						"```\n" +
						`Bot Uptime: ${ms(process.uptime() * 1000, { long: true })}\n	` +
						`Memory Used: ${ut.formatBytes(process.memoryUsage().heapUsed)}\n` +
						`Guilds: ${totalGuilds}, Members: ${totalMembers}\n` +
						`Commands Used: ${this.client.gp.get("commands")}\n` +
						"```\n";
					const embed = new MessageEmbed()
						.setFooter(message.author.tag)
						.setThumbnail(this.client.user.avatarURL())
						.setColor(this.client.colors.default)
						.addField(`☆ Bot Stats ${this.client.user.username}`, botStats)
						.addField(`☆ System stats`, sysStats);
					message.reply(embed);
				});
			});
		});
		//});
	}
}
/*
		exec("lsblk -e7 -o NAME,SIZE", async (error, stdout) => {
			const lsblks = stdout
				.replace("NAME", "")
				.replace("SIZE", "")
				.replace("\n", "")
				.replace("     ", "")
				.replace(" 1K", "ext")
				.replace("    mmcblk0", "mmcblk0")
				.replace("sr0     1024M", "sr0     1024M   ");
			const lsblk = lsblks.split("\n");
			exec("neofetch --stdout --config none", async (error, stdout) => {
				let list = "";
				const neofetch = stdout;
				const _neofetch = neofetch.split("\n");
				let length = _neofetch.length;
				const spaces = "                    ";
				if (_neofetch.length < lsblk.length) length = lsblk.length;
				for (let i = 0; i < length + 2; i++) {
					if (i < 2) {
						list += `${_neofetch[i]}\n`;
						continue;
					}
					if (`${lsblk[i - 2] || spaces}  ${_neofetch[i]}\n` == spaces || undefined) continue;
					if (`${lsblk[i - 2] || spaces}  ${_neofetch[i] || ""}`.endsWith("  ") && `${lsblk[i - 2] || spaces}  ${_neofetch[i] || ""}`.startsWith(" ")) continue;
					list += `${lsblk[i - 2] || spaces}  ${_neofetch[i] || ""}\n`;
					list = list.replace("                      ", " ".repeat(lsblk[2]?.length) + "  ");
				}
			exec('ps -e | wc -l', async (error, stdout) => {
				message.reply('```' + `${lsblk}` + '```');
			});
            */
