import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import moment from "moment";
export default class ServerCommand extends Command {
	constructor() {
		super("server", {
			aliases: ["server", "guild"],
			category: "Info",
			quoted: true,
			slash: true,

			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	exec(message: Message): Promise<Message> {
		const embed = new MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.addField(
				"**Stats »**",
				`⮩ **Owner:**    <@${message.guild.ownerID}>\n` +
					`⮩ **Members:**  ${message.guild.memberCount}\n` +
					`⮩ **Emojis:**   ${message.guild.emojis.cache.size}\n` +
					`⮩ **Roles:**    ${message.guild.roles.cache.size}\n` +
					`⮩ **Channels:** ${message.guild.channels.cache.size}\n` +
					`⮩ **Created:**  ${moment(message.guild.createdTimestamp).fromNow()}\n`
			)
			.addField(
				`Roles [${message.guild.roles.cache.array().length}] »`,
				message.guild.roles.cache
					.sort((one, two) => (two.position > one.position ? 1 : -1))
					.filter((role) => message.guild.id != role.id)
					.map((role) => (message.guild == message.guild ? role.toString() : role.name))
					.join(", ")
					.slice(0, 1000)
			)
			.setColor(this.client.colors.default);

		return message.reply(embed);
	}
}
