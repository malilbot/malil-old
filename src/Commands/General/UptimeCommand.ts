import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class UptimeCommand extends Command {
    public constructor() {
        super("uptime", {
            aliases: ["uptime", "up"],
            category: "General",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            description: {
                content: "Show the uptime of the bot",
                usage: "uptime",
                example: [
                    "uptime"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {

let uptime = ``;
		let totalSeconds = this.client.uptime / 1000;
		let week = Math.floor(totalSeconds / 604800);
		totalSeconds %= 604800;
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		if (hours > 23) {
			days = days + 1;
			hours = 0;
		}

		if (days == 7) {
			days = 0;
			week = week + 1;
		}

		if (week > 0) {
			uptime += `${week} week, `;
		}

		if (minutes > 60) {
			minutes = 0;
		}

		uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		let serverembed = new MessageEmbed()
			.setColor('#228B22')
			.addField('Bots Uptime', uptime);

		message.channel.send(serverembed);

    }
}