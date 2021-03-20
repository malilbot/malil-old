import { Command } from "discord-akairo";
import { GetMember } from "../../lib/Utils";
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember, Channel } from "discord.js";
import { hst } from "../../lib/Utils";
export default class LockCommand extends Command {
	public constructor() {
		super("lock", {
			aliases: ["lock", "unlock", "close", "lockchannel", "unlockchannel"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "selectedChannel",
					type: "channel",
					match: "rest",
				},
			],
			channel: "guild",
			clientPermissions: ["MANAGE_CHANNELS"],
			userPermissions: ["MANAGE_CHANNELS"],
			typing: true,
		});
	}

	public async exec(message: Message, { selectedChannel }: { selectedChannel: TextChannel }): Promise<void> {
		const channel: TextChannel = selectedChannel ? (selectedChannel as TextChannel) : (message.channel as TextChannel);
		if (message.util.parsed.alias == "unlockchannel" || message.util.parsed.alias == "unlock") {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle("Channel Unlocked")
				.setDescription("This channel has been unlocked by a staff member. You may chat now.")
				.setFooter(`Unlocked by ${message.author.tag}.`)
				.setColor(this.client.consts.colors.green);
			channel.send(embed);
		} else {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle("Channel locked")
				.setDescription("This channel has been locked by a staff member. sending messages has been blocked")
				.setFooter(`locked by ${message.author.tag}.`)
				.setColor(this.client.consts.colors.red);
			channel.send(embed);
		}
	}
}
