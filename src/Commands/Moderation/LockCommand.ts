import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, TextChannel } from "discord.js";
export default class LockCommand extends Command {
	constructor() {
		super("lock", {
			aliases: ["lock", "unlock", "close", "lockchannel", "unlockchannel"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "selectedChannel",
					type: "content",
					match: "rest",
				},
			],
			description: {
				content: "To lock a channel",
				usage: "lock #channel",
				example: ["lock #general"],
			},
			channel: "guild",
			clientPermissions: ["MANAGE_CHANNELS"],
			userPermissions: ["MANAGE_CHANNELS"],
		});
	}

	async exec(message: Message, { selectedChannel }: { selectedChannel: string }): Promise<void> {
		selectedChannel = selectedChannel?.replace(/(<|>|#)/g, "");
		const chnl = message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == selectedChannel) || message.guild.channels.cache.get(selectedChannel);

		const channel: TextChannel = chnl ? (chnl as TextChannel) : (message.channel as TextChannel);
		if (message.util.parsed.alias == "unlockchannel" || message.util.parsed.alias == "unlock") {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle("Channel Unlocked")
				.setDescription("This channel has been unlocked by a staff member. You may chat now.")
				.setFooter(`Unlocked by ${message.author.tag}.`)
				.setColor(this.client.colors.green);
			channel.send(embed);
		} else {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle("Channel locked")
				.setDescription("This channel has been locked by a staff member. sending messages has been blocked")
				.setFooter(`locked by ${message.author.tag}.`)
				.setColor(this.client.colors.red);
			channel.send(embed);
		}
	}
}
