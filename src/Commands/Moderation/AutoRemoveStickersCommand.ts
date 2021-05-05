import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";

export default class StickerCommand extends Command {
	public constructor() {
		super("Sticker", {
			aliases: ["Sticker", "removesticker", "nosticker", "sticcker", "blackliststicker", "sweepsticker", "byesticker", "fucksticker", "nomoresticker", "quitstickers"],
			category: "Moderation",
			description: {
				content: "Should remove all stickers once finished",
				usage: "nosticker on",
				example: ["nosticker on"],
			},
			ratelimit: 3,

			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
			channel: "guild",
			args: [
				{
					id: "Args",
					match: "rest",
					type: "string",
				},
			],
		});
	}

	public async exec(message: Message, { Args }: { Args: string }): Promise<Message> {
		return message.util.send("This command is not quite done but expect it at some point");
		if (Args.toLowerCase() == "on") {
			message.util.send("Malil will now delete every sticker it sees :smile:");
			this.client.guilddata.set(message.guild.id, true, "stickers");
		} else if (Args.toLowerCase() == "off") {
			message.util.send("Malil has stopped deleting stickers");
			this.client.guilddata.delete(message.guild.id, "stickers");
		} else {
			const item = this.client.guilddata.get(message.guild.id, "stickers");
			if (!item || item == false) {
				message.util.send("Malil will now delete every sticker it sees :smile:");
				this.client.guilddata.set(message.guild.id, true, "stickers");
			} else {
				message.util.send("Malil has stopped deleting stickers");
				this.client.guilddata.delete(message.guild.id, "stickers");
			}
		}
	}
}
