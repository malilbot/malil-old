import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { GuildEmoji } from "discord.js";
const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;
export default class CloneCommand extends Command {
	constructor() {
		super("clone", {
			aliases: ["clone", "yoink", "steal", "emo"],
			category: "Utility",
			quoted: true,
			description: {
				content: "Yoinks a emoji from a server",
				usage: "clone",
				example: ["clone"],
			},
			ratelimit: 1,
			channel: "guild",
			userPermissions: ["MANAGE_EMOJIS"],
			clientPermissions: ["MANAGE_EMOJIS", "SEND_MESSAGES"],
		});
	}

	async exec(message: Message): Promise<void | Message> {
		const msg = await message.channel.send("react to this message with your emojis within 10 seconds and ill steal them");

		const collector = msg.createReactionCollector((reaction, user) => user.id == message.author.id, { max: 4, time: 60000 });

		collector.on("collect", async (reaction, user) => {
			const link = `https://cdn.discordapp.com/emojis/${reaction.emoji.id}.${reaction.emoji.animated ? "gif" : "png"}`;
			const Emoji = message.guild.emojis.create(`${link}`, `${reaction.emoji.name}`);
			message.channel.send(`Stole ${await Emoji}`);
		});

		collector.on("end", (collected) => {
			message.channel.send("Fun time over");
		});
	}
}
