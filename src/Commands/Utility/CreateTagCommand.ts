import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class CreatetagCommand extends Command {
	public constructor() {
		super("createtag", {
			aliases: [
				"createtag",
				"addtag",
				"+tag",
				"edittag",
				"editag"
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
				content: "",
				usage: "createtag",
				example: [
					"createtag <name> <input>"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) {
			args = args.split(" ");

			const input = args.slice(1).join(" ");
			if (!input) message.channel.send("There has to be something to put in the tag.");
			await this.client.tags.ensure(message.guild.id, {});
			await this.client.tags.set(message.guild.id, input, args[0]);
			const embed = new MessageEmbed()
				.setColor(this.client.setting.colors.red)
				.setTitle("Tag created.")
				.addFields({ name: args[0], value: input });
			message.reply(embed);
		} else return message.channel.send("Sorry you dont have the required permissions to use this command");
	}
}
