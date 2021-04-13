import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class iqqCommand extends Command {
	constructor() {
		super("iqq", {
			name: "iqq",
			description: "Send your actual iq",
			options: [
				{
					type: 6,
					name: "user",
					description: "The iq of the user you want to see",
					required: false,
				},
			],
		});
	}

	async exec(message: CommandInteraction) {
		const member = message.options[0]?.user ?? message.user;
		const em = this.client.util
			.embed()
			.setColor(this.client.consts.colors.default)
			.setTitle("IQ Test")
			.setDescription(`${message.options[0]?.user ?? message.user}'s IQ is: \`${this.client.UserData.ensure(member.id, Math.floor(Math.random() * 150) + 1, "iq")}\`!`);
		if (Math.floor(Math.random() * 10 + 1) == 5) em.setFooter(`You can vote to get increased iq /vote`);
		message.reply(em);
	}
}
