import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";
export default class HelpCommand extends Command {
	public constructor() {
		super("help", {
			aliases: ["help", "h", "ls", "commands"],
			category: "General",
			description: {
				content: "Show available commands on the bot",
				usage: "help [ command ]",
				example: ["help ping", "h ping"],
			},
			ratelimit: 3,
			args: [
				{
					id: "command",
					type: "commandAlias",
					default: null,
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			channel: "guild",
		});
	}

	public exec(message: Message, { command }: { command: Command }) {
		if (command) {
			return message.util.send(
				new MessageEmbed()
					.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
					.setColor(this.client.consts.colors.orange)
					.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" })).setDescription(stripIndents`
            **Aliases**
            ${command.aliases.map((x) => `\`${x}\``).join(" | ")}

            **Description**
            ${command.description.content || "No Content"}
            
            **Usage**
            ${command.description.usage || "No Usage Provided"}
            
            **Example**
            ${command.description.example ? command.description.example.map((e) => `\`${e}\``).join("\n") : "No Example Provided"}`)
			);
		}

		const embed = new MessageEmbed()
			.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setColor(this.client.consts.colors.orange)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
			.setDescription("For help and bugs visit the [support server](https://discord.gg/mY8zTARu4g).")
			.setFooter(`@malil help [ command ] for more information on a command.`);

		for (const category of this.handler.categories.values()) {
			if (["default"].includes(category.id)) continue;
			if (category.id !== "Developer" && category.id !== "Custom") {
				embed.addField(
					category.id,
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => `**\`${cmd}\`**`)
						.join(" | " || "No Commands in this category.")
				);
			}
		}
		return message.util.reply({
			embed: embed,
			allowedMentions: { repliedUser: false },
		});
	}
}
