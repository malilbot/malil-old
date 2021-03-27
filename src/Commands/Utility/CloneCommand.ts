import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { Util } from "discord.js";
export default class CloneCommand extends Command {
	public constructor() {
		super("clone", {
			aliases: ["clone", "yoink", "steal", "emo"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "Yoinks a emoji from a server",
				usage: "clone",
				example: ["clone"],
			},
			ratelimit: 3,
			channel: "guild",
			userPermissions: ["MANAGE_EMOJIS"],
			clientPermissions: ["MANAGE_EMOJIS", "SEND_MESSAGES"],
		});
	}

	public async exec(message: Message, { args }: { args: string }): Promise<void> {
		if (!args.startsWith("<:") || !args.endsWith(">")) {
			message.reply("Thats not a emoji");
			return;
		}
		const customEmo = Util.parseEmoji(args);
		if (!customEmo) {
			message.reply("Atleast give a valid emoji");
			return;
		}
		const link = `https://cdn.discordapp.com/emojis/${customEmo.id}.${customEmo.animated ? "gif" : "png"}`;

		const emoname = customEmo.name;
		if (!customEmo) {
			message.reply("Atleast give a valid emoji");
			return;
		}
		if (message.guild.emojis.cache.find((emoji) => emoji.id === customEmo.id)) {
			message.channel.send("You cant clone a emoji you already have that would be weird");
			return;
		}
		const emoji = message.guild.emojis.create(`${link}`, `${emoname}`);
		message.channel.send(`Cloned ${await emoji} enjoy!`);
	}
}
