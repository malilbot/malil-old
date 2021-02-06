import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class TagCommand extends Command {
	public constructor() {
		super("tag", {
			aliases: [
				"tag"
			],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "Shows a tag",
				usage: "tag",
				example: [
					"tag <name>"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		if (!args) return message.reply("Try again but this time actually mention a tag");
		await this.client.tags.ensure(message.guild.id, {});
		if (!this.client.tags.get(message.guild.id, args)) return message.channel.send("Sorry couldnt find that tag");
		const embed = new MessageEmbed()
			.setColor("GREEN")
			.setTitle(args)
			.setDescription(this.client.tags.get(message.guild.id, args));
		message.reply(embed);
	}
}
