import { Command } from "discord-akairo";
import type { Message, GuildMember, Guild } from "discord.js";
import { MessageEmbed } from "discord.js";
import { GetMember } from "../../Lib/Utils";

export default class IqCommand extends Command {
	public constructor() {
		super("iq", {
			aliases: ["iq", "smart"],
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
			description: {
				content: "Uses math to calculate your iq",
				example: ["iq", "iq @user", "iq rick"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const iq: number = this.client.userdata.ensure(member.id, Math.floor(Math.random() * 150) + 1, "iq");

		const iEmbed = new MessageEmbed().setColor(this.client.colors.default).setTitle("IQ Test").setDescription(`${member}'s IQ is: \`${iq}\`!`);

		if (Math.floor(Math.random() * 40 + 1) == 5) iEmbed.setImage("https://i.imgur.com/skuWtMT.png");
		if (Math.floor(Math.random() * 10 + 1) == 5)
			iEmbed.setFooter(`You can vote to get increased iq ${(await this.client.prefixes.get(message.guild.id, "prefix")) || this.client.settings.prefix}vote`);

		return message.util.send(iEmbed);
	}
}
