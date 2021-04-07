import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { CreateGist } from "../../Lib/Utils";

export default class RawTagCommand extends Command {
	public constructor() {
		super("rawtag", {
			aliases: ["rawtag"],
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
				content: "show a tag as in raw",
				usage: "rawtag",
				example: ["rawtag"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<Message> {
		await this.client.tags.ensure(message.guild.id, {});
		const raw = await this.client.tags.get(message.guild.id, args);
		if (!raw) return message.util.send("tag not found");
		const embed = new MessageEmbed().setTitle("Raw tag data").setDescription(await CreateGist(args, raw, this.client));
		message.util.send(embed);
		// await message.util.send(await gist(args, raw))
	}
}
