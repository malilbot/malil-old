import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";
import { utc } from "moment";
import os from "os";
import { Util, ms } from "../Lib/Utils";
export default class statsCommand extends Command {
	constructor() {
		super("stats", {
			name: "stats",
			description: "Gives some stats about the bot",
		});
	}

	async exec(message: CommandInteraction) {
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
