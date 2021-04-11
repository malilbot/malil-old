import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class avatarCommand extends Command {
	constructor() {
		super("avatar", {
			//
			description: "",
		});
	}

	async exec(message: CommandInteraction) {
		const member = message.options[0]?.user ?? message.user;
		return message.reply(
			this.client.util
				.embed()
				.setTitle(`${member.username}'s Avatar`)
				.setURL(member.displayAvatarURL({ format: "png", size: 512, dynamic: true }))
				.setColor(this.client.consts.colors.green)
				.setImage(member.displayAvatarURL({ format: "png", size: 512, dynamic: true }))
		);
	}
}
