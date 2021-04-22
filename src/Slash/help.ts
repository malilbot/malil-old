import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class helpCommand extends Command {
	constructor() {
		super("help", {
			name: "help",
			description: "Sends the commands malil has",
		});
	}

	async exec(message: CommandInteraction) {
		const embed = this.client.util
			.embed()
			.setAuthor(`Help | ${this.client.user.tag}`, this.client.user.displayAvatarURL())
			.setColor(this.client.colors.orange)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 2048, format: "png" }))
			.setDescription("For help and bugs visit the [support server](https://discord.gg/mY8zTARu4g).");
		let slashes = [];
		//@ts-ignore
		for (const module of this.client.slashHandler.modules) {
			slashes.push(`**\`${module[1].data.name}\`**`);
		}
		embed.addField("Slash Commands", slashes.join(" | "));
		//@ts-ignore
		for (const category of this.client.commandHandler.categories.values()) {
			if (["default"].includes(category.id)) continue;
			if (category.id !== "Developer" && category.id !== "Custom") {
				embed.addField(
					category.id,
					category //@ts-ignore
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => `**\`${cmd}\`**`)
						.join(" | " || "No Commands in this category.")
				);
			}
		}
		return message.reply(embed);
	}
}
