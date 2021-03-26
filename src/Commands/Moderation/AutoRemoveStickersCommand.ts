import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetMember, ms, Infract } from "../../lib/Utils";

export default class StickerCommand extends Command {
	public constructor() {
		super("Sticker", {
			aliases: ["Sticker", "removesticker", "nosticker", "sticcker", "blackliststicker", "sweepsticker", "byesticker", "fucksticker", "nomoresticker", "quitstickers"],
			category: "Moderation",
			description: {
				content: "This is very usefull and removes all those useless stickers that flood the chat and make some peoples devices into a slideshow",
				usage: "nosticker on",
				example: ["nosticker on"]
			},
			ratelimit: 3,

			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
			channel: "guild",
			args: [
				{
					id: "Args",
					match: "rest",
					type: "string"
				}
			]
		});
	}

	public async exec(message: Message, { Args }: { Args: string }) {
		return message.channel.send("This command is not quite done but expect it at some point");
		if (Args.toLowerCase() == "on") {
			message.reply("Malil will now delete every sticker it sees :smile:");
			this.client.guilddata.set(message.guild.id, true, "stickers");
		} else if (Args.toLowerCase() == "off") {
			message.reply("Malil has stopped deleting stickers");
			this.client.guilddata.delete(message.guild.id, "stickers");
		} else {
			const item = this.client.guilddata.get(message.guild.id, "stickers");
			if (!item || item == false) {
				message.reply("Malil will now delete every sticker it sees :smile:");
				this.client.guilddata.set(message.guild.id, true, "stickers");
			} else {
				message.reply("Malil has stopped deleting stickers");
				this.client.guilddata.delete(message.guild.id, "stickers");
			}
		}
	}
}
