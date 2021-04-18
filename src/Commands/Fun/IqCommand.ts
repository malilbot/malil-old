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
						if (member) return member || message.member;
					},
					match: "content",
				},
			],
			description: {
				content: "Find your iq",
				usage: "iq",
				example: ["iq"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }): Promise<void> {
		const iq: number = this.client.UserData.ensure(member.id, Math.floor(Math.random() * 150) + 1, "iq");

		const iEmbed = new MessageEmbed().setColor(this.client.consts.colors.default).setTitle("IQ Test").setDescription(`${member}'s IQ is: \`${iq}\`!`);

		if (Math.floor(Math.random() * 40 + 1) == 5) iEmbed.setImage("https://i.imgur.com/skuWtMT.png");
		if (Math.floor(Math.random() * 10 + 1) == 5)
			iEmbed.setFooter(`You can vote to get increased iq ${(await this.client.prefixes.get(message.guild.id, "prefix")) || this.client.settings.prefix}vote`);
		message.util.send(iEmbed);
	}
}
