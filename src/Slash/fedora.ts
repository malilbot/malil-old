import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";
import { MessageAttachment } from "discord.js";
import c from "centra";

export default class fedoraCommand extends Command {
	constructor() {
		super("fedora", {
			//
			description: "",
		});
	}

	async exec(message: CommandInteraction) {
		const member = message.options[0]?.user ?? message.user;
		const res = await c(`https://api.dagpi.xyz/image/fedora/?url=${member.avatarURL({ dynamic: false, format: "png" })}`, "get")
			.header("Authorization", this.client.credentials.dagpi)
			.send();
		const attachment = new MessageAttachment(res.body, `Fedora'd.png`);
		return message.reply({ content: "here ya go", files: [{ attachment: res.body, name: `Fedora'd.png` }] });
	}
}
