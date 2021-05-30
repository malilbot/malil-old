import { Inhibitor, Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { superUsers } from "../Lib/config";
const timeoutObject = {};
const blacklist = {};
export default class extends Inhibitor {
	constructor() {
		super("Autoblacklist", {
			reason: "Autoblacklist",
			priority: 5,
			type: "post",
		});
	}

	exec(message: Message, command: Command): boolean {
		if (superUsers.includes(message.author.id)) return false;
		if (blacklist[message.author.id] == true) return true;

		if (!timeoutObject[message.author.id]) {
			timeoutObject[message.author.id] = 0;
		}
		const num = timeoutObject[message.author.id];
		timeoutObject[message.author.id] = num + 1;
		setTimeout(function () {
			const num = timeoutObject[message.author.id];
			timeoutObject[message.author.id] = num - 1;
		}, 1200000);
		if (num == 30) {
			this.client.logger.command(message, command, "Blacklisted");
			timeoutObject[message.author.id] = 0;
			blacklist[message.author.id] = true;
			message.reply(
				new MessageEmbed()
					.setImage("https://http.cat/423")
					.addField("You have been blacklisted from using this bot for 24 hours", "If you believe this is a mistake visit the support [server](https://discord.gg/mY8zTARu4g)")
					.setColor(this.client.colors.purple)
			);
			setTimeout(function () {
				this.client.logger.command(message, command, "Unblacklisted");
				blacklist[message.author.id] = false;
			}, 86400000);
		}
		return false;
	}
}
