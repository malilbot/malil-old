import { Inhibitor } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { sec, third, a1, Format } from "../lib/Utils";
import { superUsers } from "../lib/config";
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

	public async exec(message: Message): Promise<boolean> {
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
			const { GStr, UStr } = Format(message, null, null, null);
			this.client.logger.info(a1(`[ USER ] ${UStr} [ GUILD ] ${GStr} [ BLACKLISTED ]`));
			timeoutObject[message.author.id] = 0;
			blacklist[message.author.id] = true;
			message.util.send(
				new MessageEmbed()
					.setImage("https://http.cat/423")
					.addField("You have been blacklisted from using this bot for 24 hours", "If you believe this is a mistake visit the support [server](https://discord.gg/mY8zTARu4g)")
					.setColor(this.client.consts.colors.purple)
			);
			setTimeout(function () {
				this.client.logger.info(third("[ UN-BLACKLISTED USER ] " + sec(`[ ${message.author.tag} ] [ ${message.author.id}]`)));
				blacklist[message.author.id] = false;
			}, 86400000);
		}
		return false;
	}
}
