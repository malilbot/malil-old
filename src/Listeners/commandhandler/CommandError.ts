import { MessageEmbed, Message } from "discord.js";
import { Listener } from "discord-akairo";
import Command from "../../Classes/malilCommand";
import { hst, a1 } from "../../Lib/Utils";

export default class CommandErrorListener extends Listener {
	constructor() {
		super("commandError", {
			emitter: "commandHandler",
			event: "error",
			category: "commands",
		});
	}

	async exec(error: Error, message: Message, command: Command | null | undefined): Promise<Message> {
		if (error.stack.includes("DiscordAPIError: Cannot channel.send without permission to read message history")) {
			message.reply("I cannot work properly without seeing message history");
			return;
		}
		if (error.stack.includes("DiscordAPIError: Cannot reply without permission to read message history")) {
			message.reply("I cannot work properly without seeing message history");
			return;
		}

		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));
		this.client.logger.command(message, command, "Error");
		this.client.logger.info(a1(`[ CONTENT ] ${message.content}`));
		this.client.logger.info(a1(error.stack));
		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));

		const errorEmbed: MessageEmbed = new MessageEmbed()

			.setDescription(
				`**User:** ${message.author} (${message.author.tag})\n` +
					`**Command:** ${command}\n` +
					`**Channel:** ${message.channel} (${message.channel.id})\n` +
					`**Message:** [link](${message.url})\n`
			)
			.addField("Error", `${await hst(error.stack)}`)
			.setTimestamp();
		const errrorr: MessageEmbed = this.client.util
			.embed()
			.setColor("RED")
			.addField("ERROR", "```js\n" + `${error.stack.slice(0, 1000)}` + "```");

		const errorUser = this.client.util.embed().setTitle("An error occurred and has been reported to the devs").setTimestamp().setColor(this.client.colors.orange);
		if (message.guild.id == "748956745409232945") {
			errorUser.setDescription("haha errors go brrrrr");
		} else {
			errorUser.setDescription("To get an update on if the issue has been fixed go to the [support discord](https://discord.gg/TAp9Kt2)");
		}
		this.client.webhook.send({ embeds: [errorEmbed, errrorr] });
		return message.reply(errorUser);
	}
}
