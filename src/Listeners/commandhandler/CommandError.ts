import { MessageEmbed, Message, TextChannel } from "discord.js";
import { Listener } from "discord-akairo";
import { stripIndents } from "common-tags";
import { Command } from "discord-akairo";
import { hst, Format, a1 } from "../../lib/Utils";

export default class CommandErrorListener extends Listener {
	public constructor() {
		super("commandError", {
			emitter: "commandHandler",
			event: "error",
			category: "commands",
		});
	}

	public async exec(error: Error, message: Message, command: Command | null | undefined): Promise<void> {
		if (error.stack.startsWith("DiscordAPIError: Cannot reply without permission to read message history")) {
			message.channel.send("I cannot work properly without seeing message history");
			return;
		}
		const { GStr, UStr, CStr } = Format(message, command, null);
		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));
		this.client.logger.info(a1(`[ COMMAND ERRORED ][ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr}`));
		this.client.logger.info(a1(`[ CONTENT ] ${message.content}`));
		this.client.logger.info(a1(error.stack));
		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));
		const errorNo = Math.floor(Math.random() * 6969696969) + 69; // hehe funy number
		const errorEmbed: MessageEmbed = new MessageEmbed()
			.setTitle(`Error # \`${errorNo}\`: An error occurred`)
			.setDescription(
				stripIndents`**User:** ${message.author} (${message.author.tag})
				**Command:** ${command}
				**Channel:** ${message.channel} (${message.channel.id})
				**Message:** [link](${message.url})`
			)
			.addField("Error", `${await hst(error.stack)}`)
			.setTimestamp();
		const errorUserEmbed: MessageEmbed = new MessageEmbed()
			.setTitle("An error occurred and has been reported to the devs")
			.setDescription("To get an update on if the issue has been fixed go to the [support discord](https://discord.gg/TAp9Kt2)")
			.setTimestamp()
			.setColor(this.client.consts.colors.orange);
		const channel = await this.client.channels.fetch(this.client.consts.errChannel);
		await (channel as TextChannel).send(errorEmbed);
		message.channel.send(errorUserEmbed);
	}
}
