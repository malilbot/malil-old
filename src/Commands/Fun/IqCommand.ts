import Command from "../../Classes/malilCommand";
import type { Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";

export default class IqCommand extends Command {
	constructor() {
		super("iqtest", {
			aliases: ["iq", "smart", "iqtest"],
			category: "Fun",
			slash: true,
			args: [
				{
					id: "user",
					type: async (message, content) => {
						const member = await GetMember(message, content);
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

	async exec(message: Message, { user = message.member }: { user: GuildMember }): Promise<Message> {
		const iq = (await this.client.getUser(user.id)).iq;

		const iEmbed = this.client.util.embed().setColor(this.client.colors.default).setTitle("IQ Test").setDescription(`${user}'s IQ is: \`${iq}\`!`);

		if (this.client.random(50) == 5) iEmbed.setImage("https://i.imgur.com/skuWtMT.png");
		//if (this.client.random(10) == 5) iEmbed.setFooter(`You can vote to get increased iq ${(await this.client.getPrefix(message.guild.id)) || this.client.settings.prefix}vote`);

		return message.reply(iEmbed);
	}
}
