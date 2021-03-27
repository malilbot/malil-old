import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class TagCommand extends Command {
	public constructor() {
		super("tag", {
			aliases: ["tag"],
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
				content: "Shows a tag",
				usage: "tag",
				example: ["tag <name>"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }: { args: string }): Promise<Message> {
		if (!args) return message.util.send("Try again but this time actually mention a tag");
		await this.client.tags.ensure(message.guild.id, {});
		if (!this.client.tags.get(message.guild.id, args)) return message.util.send("Sorry couldnt find that tag");
		const embed = new MessageEmbed().setColor(this.client.consts.colors.green).setTitle(args).setDescription(this.client.tags.get(message.guild.id, args));
		message.util.send({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
