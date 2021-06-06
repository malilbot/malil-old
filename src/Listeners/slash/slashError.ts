import { Listener, AkairoMessage } from "discord-akairo";
import Command from "../../Classes/malilCommand";

import { hst } from "../../Lib/Utils";
export default class CommandErrorListener extends Listener {
	constructor() {
		super("slashError", {
			emitter: "commandHandler",
			event: "slashError",
			category: "commands",
		});
	}

	async exec(error: Error, message: AkairoMessage, command: Command): Promise<void> {
		const errorEmbed = this.client.util
			.embed()

			.setDescription(
				`**User:** ${message.author} (${message.author.tag})\n` +
					`**Command:** ${command}\n` +
					`**Channel:** ${message.channel} (${message.channel.id})\n` +
					`**Message:** [link](${message.url})\n`
			)
			.addField("Error", `${await hst(error.stack)}`)
			.setTimestamp();
		const errrorr = this.client.util
			.embed()
			.setColor("RED")
			.addField("ERROR", "```js\n" + `${error.stack.slice(0, 1000)}` + "```");
		this.client.webhook.send({ embeds: [errorEmbed, errrorr] });
		this.client.logger.error("──────────────────────────────────────────────────────────────────────");
		this.client.logger.command(message, command, "Error");
		this.client.logger.error(`[ CONTENT ] ${message.content}`);
		this.client.logger.fatal(error.stack);
		this.client.logger.error("──────────────────────────────────────────────────────────────────────");
	}
}
