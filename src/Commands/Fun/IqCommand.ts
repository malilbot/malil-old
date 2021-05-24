import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, CommandInteraction } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";

export default class IqCommand extends Command {
	constructor() {
		super("iqtest", {
			aliases: ["iq", "smart", "iqtest"],
			category: "Fun",
			args: [
				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
			],
			options: [
				{
					type: 6,
					name: "user",
					description: "Iq of the user to test from",
					required: false,
				},
			],
			description: {
				content: "IQ_DESCRIPTION_CONTENT",
				example: "IQ_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}

	async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const iq = (await this.client.db.getUser(member.id)).iq;

		const iEmbed = new MessageEmbed().setColor(this.client.colors.default).setTitle("IQ Test").setDescription(`${member}'s IQ is: \`${iq}\`!`);

		if (this.client.random(50) == 5) iEmbed.setImage("https://i.imgur.com/skuWtMT.png");
		if (this.client.random(10) == 5) iEmbed.setFooter(`You can vote to get increased iq ${(await this.client.db.getPrefix(message.guild.id)) || this.client.settings.prefix}vote`);

		return message.util.send(iEmbed);
	}
	async execSlash(interaction: CommandInteraction) {
		const member = interaction.options[0]?.user ?? interaction.user;
		const embed = this.client.util
			.embed()
			.setColor(this.client.colors.default)
			.setTitle("IQ Test")
			.setDescription(`${interaction.options[0]?.user ?? interaction.user}'s IQ is: \`${(await this.client.db.getUser(member.id)).iq}\`!`);
		if (this.client.random(10) == 5) embed.setFooter(`You can vote to get increased iq /vote`);
		interaction.reply(embed);
	}
}
