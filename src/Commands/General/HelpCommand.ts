import Command from "../../Classes/malilCommand";
import { Message, MessageEmbed, CommandInteraction } from "discord.js";
export default class HelpCommand extends Command {
	constructor() {
		super("help", {
			aliases: ["help", "h", "ls", "commands"],
			category: "General",
			description: {
				content: "HELP_DESCRIPTION_CONTENT",
				example: "HELP_DESCRIPTION_EXAMPLE",
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

	async exec(message: Message, { command }: { command: Command }): Promise<Message> {
		if (command) {
			const { ALIAS, DESCRIPTION, EXAMPLES } = await this.client.getObject(message, {
				ALIAS: "",
				DESCRIPTION: "",
				EXAMPLES: "",
			});
			const content = await this.client.sget(message, command.description.content);
			const examples = await (<any>this.client.sget(message, command.description.example));

			return message.util.send(
				new MessageEmbed()
					.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
					.setColor(this.client.colors.orange)
					.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
					.setDescription(
						`**${ALIAS}**\n` +
							`${command.aliases.map((x) => `\`${x}\``).join(" | ")}\n\n` +
							`**${DESCRIPTION}**\n` +
							`${content || "No Content"}\n\n` +
							`**${EXAMPLES}**\n` +
							`${Array.isArray(examples) ? examples.map((e) => `\`${e}\``).join("\n") : "No Example Provided"}`
					)
			);
		}

		const embed = new MessageEmbed()
			.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setColor(this.client.colors.orange)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
			.setDescription("For help and bugs visit the [support server](https://discord.gg/mY8zTARu4g) or [website](https://malilbot.github.io/docs/intro).")
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
		return message.util.send({
			embed: embed,
			allowedMentions: { repliedUser: false },
		});
	}
	async execSlash(message: CommandInteraction) {
		const embed = this.client.util
			.embed()
			.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setColor(this.client.colors.orange)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
			.setDescription("For help and bugs visit the [support server](https://discord.gg/mY8zTARu4g) or [website](https://malilbot.github.io/docs/intro).");

		for (const category of this.client.commandHandler.categories.values()) {
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
		return message.reply(embed);
	}
}
