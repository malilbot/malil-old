import Command from "../../Classes/malilCommand";
import type { Message, CommandInteraction } from "discord.js";
import { utc } from "moment";
import os from "os";

import { Util, ms } from "../../Lib/Utils";

export default class StatsCommand extends Command {
	public constructor() {
		super("stats", {
			aliases: ["stats", "st", "info"],
			category: "Info",
			description: {
				content: "The Statistic of bot",
				example: ["stats"],
			},
			args: [
				{
					id: "stats",
					type: (_, content) => {
						return content.split(" ")[0];
					},
					match: "content",
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public exec(message: Message, { stats }: { stats: string }): Promise<Message> {
		const ut = new Util();
		const core = os.cpus()[0];
		const djsversion = require("discord.js").version;
		const akairov = require("discord-akairo").version;
		if (stats == "cache") {
			return message.channel.send(
				this.client.util
					.embed()
					.setColor(this.client.colors.green)
					.addField("Cached users", this.client.users.cache.size)
					.addField("Guild cached presences", message.guild.presences.cache.size)
					.addField("Guild cached users", message.guild.members.cache.size)
			);
		} else {
			return message.util.send(
				this.client.util
					.embed()
					.setAuthor(this.client.user.tag, this.client.user.avatarURL())
					.setThumbnail(this.client.user.displayAvatarURL())
					.setTimestamp()
					.setColor(message.guild.me.displayHexColor || "RED")
					.addField("General", [
						`**● Name:** ${this.client.user.tag} (${this.client.user.id})`,
						`**● Servers:** ${this.client.guilds.cache.size}`,
						`**● Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
						`**● Channels:** ${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}`,
						`**● Creation Date:** ${utc(this.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
						`**● Bot Uptime:** ${ms(process.uptime() * 1000, { long: true })}`,
						`**● Owner:** <@!336465356304678913>`,
						`**● Support:** [Support server](https://discord.gg/mY8zTARu4g)`,
						`**● Commands ran:** ${this.client.gp.get("commands")}`,
						`**● Node.js:** ${process.version}`,
						`**● Akairo:** ${akairov}`,
						`**● Discord.js:** ${djsversion}`,
						"\u200b",
					])
					.addField("System", [
						`**● Platform** Ubuntu Server (pi)`,
						`**● Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
						`**● CPU:**`,
						`\u3000 Cores: ${os.cpus().length}`,
						`\u3000 Model: ${core.model}`,
						`\u3000 Speed: ${core.speed}MHz`,
						`**● Memory:**`,
						`\u3000 Total: ${ut.formatBytes(process.memoryUsage().heapTotal)}`,
						`\u3000 Used: ${ut.formatBytes(process.memoryUsage().heapUsed)}`,
						"\u200b",
						`[credits](https://github.com/SkyBlockDev/malil-akairo/blob/main/CREDITS.md)`,
					])
			);
		}
	}
	async execSlash(message: CommandInteraction) {
		const ut = new Util();
		const core = os.cpus()[0];
		const djsversion = require("discord.js").version;
		const akairov = require("discord-akairo").version;

		return message.reply(
			this.client.util
				.embed()
				.setAuthor(this.client.user.tag, this.client.user.avatarURL())
				.setThumbnail(this.client.user.displayAvatarURL())
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor || "RED")
				.addField("General", [
					`**● Name:** ${this.client.user.tag} (${this.client.user.id})`,
					`**● Servers:** ${this.client.guilds.cache.size}`,
					`**● Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
					`**● Channels:** ${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}`,
					`**● Creation Date:** ${utc(this.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
					`**● Bot Uptime:** ${ms(process.uptime() * 1000, { long: true })}`,
					`**● Owner:** Tricked#3777`,
					`**● Commands ran:** ${this.client.gp.get("commands")}`,
					`**● Node.js:** ${process.version}`,
					`**● Akairo:** ${akairov}`,
					`**● Discord.js:** ${djsversion}`,
					"\u200b",
				])
				.addField("System", [
					`**● Platform** Ubuntu Server (pi)`,
					`**● Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
					`**● CPU:**`,
					`\u3000 Cores: ${os.cpus().length}`,
					`\u3000 Model: ${core.model}`,
					`\u3000 Speed: ${core.speed}MHz`,
					`**● Memory:**`,
					`\u3000 Total: ${ut.formatBytes(process.memoryUsage().heapTotal)}`,
					`\u3000 Used: ${ut.formatBytes(process.memoryUsage().heapUsed)}`,
					"\u200b",
					`[website](https://malilbot.github.io/) | [Support server](https://discord.gg/mY8zTARu4g)`,
				])
		);
	}
}
