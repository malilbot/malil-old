import Command from "../../Classes/malilCommand";
import { Message, MessageEmbed, CommandInteraction } from "discord.js";
export default class HelpCommand extends Command {
	constructor() {
		super("help", {
			aliases: ["help", "h", "ls", "commands"],
			category: "General",
			description: "",
			slash: true,
			args: [
				{
					id: "command",
					type: "commandAlias",
					default: null,
				},
			],
			options: [
				{
					type: 3,
					name: "command",
					description: "the command you want help for",
					required: false,
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			channel: "guild",
		});
	}

	async exec(message: Message, { command }: { command: Command | string }): Promise<Message> {
		if (command) {
			const i = command instanceof Command ? command : this.handler.modules.get(command);

			if (i instanceof Command) {
				const { ALIAS, DESCRIPTION, EXAMPLES } = await this.client.getObject(message, {
					ALIAS: "",
					DESCRIPTION: "",
					EXAMPLES: "",
				});
				const content = await this.client.sget(message, `${i.id.toUpperCase()}_DESCRIPTION_CONTENT`);
				const examples = await this.client.sget(message, `${i.id.toUpperCase()}_DESCRIPTION_EXAMPLE`);

				return message.reply(
					new MessageEmbed()
						.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
						.setColor(this.client.colors.orange)
						.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
						.setDescription(
							`**${ALIAS}**\n` +
								`${i.aliases.map((x) => `\`${x}\``).join(" | ")}\n\n` +
								`**${DESCRIPTION}**\n` +
								`${content || "No Content"}\n\n` +
								`**${EXAMPLES}**\n` +
								`${Array.isArray(examples) ? examples.map((e) => `\`${e}\``).join("\n") : "No Example Provided"}`
						)
				);
			}
		}
		const { MALIL_HELP_FOOTER } = await this.client.getObject(message, {
			MALIL_HELP_FOOTER: "",
		});
		const embed = new MessageEmbed()
			.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setColor(this.client.colors.orange)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
			.setDescription("For help and bugs visit the [support server](https://discord.gg/mY8zTARu4g) or [website](https://malilbot.github.io/docs/intro).")
			.setFooter(MALIL_HELP_FOOTER);

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
		return message.reply({
			embed: embed,
			allowedMentions: { repliedUser: false },
		});
	}
}
