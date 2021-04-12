import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class iqqCommand extends Command {
	constructor() {
		super("iqq", {
			name: "iqq",
			description: "Send your **actual** iq",
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
		let iq: number;
		this.client.UserData.ensure(member.id, {
			iq: 0,
		});
		if (this.client.UserData.get(member.id, "iq")) {
			iq = this.client.UserData.get(member.id, "iq");
		} else {
			iq = Math.floor(Math.random() * 150) + 1;
			this.client.UserData.set(member.id, iq, "iq");
		}
		const iEmbed = this.client.util.embed().setColor(this.client.consts.colors.default).setTitle("IQ Test").setDescription(`${member}'s IQ is: \`${iq}\`!`);
		if (Math.floor(Math.random() * 10 + 1) == 5)
			iEmbed.setFooter(`You can vote to get increased iq ${(await this.client.prefixes.get(message.guild.id, "prefix")) || this.client.settings.prefix}vote`);
		message.reply(iEmbed);
	}
}
