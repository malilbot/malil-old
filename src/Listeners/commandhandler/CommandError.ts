import { MessageEmbed, Message, TextChannel, Interaction } from "discord.js";
import { Listener } from "discord-akairo";
import { stripIndents } from "common-tags";
import Command from "../../Classes/malilCommand";
import { hst, Format, a1, sLog } from "../../Lib/Utils";

export default class CommandErrorListener extends Listener {
	public constructor() {
		super("commandError", {
			emitter: "commandHandler",
			event: "error",
			category: "commands",
		});
	}

	public async exec(error: Error, message: Message, command: Command | null | undefined): Promise<void> {
		if (error.stack.includes("DiscordAPIError: Cannot channel.send without permission to read message history")) {
			message.util.send("I cannot work properly without seeing message history");
			return;
		}
		if (error.stack.includes("DiscordAPIError: Cannot reply without permission to read message history")) {
			message.util.send("I cannot work properly without seeing message history");
			return;
		}
		sLog({
			msg: message,
			command,
			type: "error",
		});
		const { GStr, UStr, CStr } = Format(message, command);
		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));
		this.client.logger.info(a1(`[ COMMAND ERRORED ][ CMD ] ${CStr} [ USER ] ${UStr} [ GUILD ] ${GStr}`));
		this.client.logger.info(a1(`[ CONTENT ] ${message.content}`));
		this.client.logger.info(a1(error.stack));
		this.client.logger.info(a1("──────────────────────────────────────────────────────────────────────"));
		const errorNo = Math.floor(Math.random() * 6969696969) + 69; // hehe funy number
		const errorEmbed: MessageEmbed = new MessageEmbed()
			.setTitle(`Error # \`${errorNo}\`: An error occurred`)
			.setDescription(
				`**User:** ${message.author} (${message.author.tag})\n` +
					`**Command:** ${command}\n` +
					`**Channel:** ${message.channel} (${message.channel.id})\n` +
					`**Message:** [link](${message.url})\n`
			)
			.addField("Error", `${await hst(error.stack)}`)
			.setTimestamp();
		let errorUserEmbed: MessageEmbed;
		if (message.guild.id == "748956745409232945") {
			errorUserEmbed = new MessageEmbed()
				.setTitle("An error occurred and has been reported to the devs")
				.setDescription("haha errors go brrrrr")
				.setTimestamp()
				.setColor(this.client.colors.orange);
		} else {
			errorUserEmbed = new MessageEmbed()
				.setTitle("An error occurred and has been reported to the devs")
				.setDescription("To get an update on if the issue has been fixed go to the [support discord](https://discord.gg/TAp9Kt2)")
				.setTimestamp()
				.setColor(this.client.colors.orange);
		}

		const channel = await this.client.channels.fetch(this.client.consts.channels.errChannel);
		await (channel as TextChannel).send(errorEmbed);
		message.util.send(errorUserEmbed);
	}
}
