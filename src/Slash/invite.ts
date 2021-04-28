//https://malilbot.github.io/invite
import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class inviteCommand extends Command {
	constructor() {
		super("invite", {
			name: "inivte",
			description: "Invite malil to your discord server",
		});
	}

	async exec(message: CommandInteraction) {
		message.reply("https://malilbot.github.io/invite");
	}
}
