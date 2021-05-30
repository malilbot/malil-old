import { MalilListener } from "../../Classes/MalilListener";
import { MessageReaction, TextChannel, Message } from "discord.js";
import Client from "../../Classes/Client";
export default class messageReactionAdd extends MalilListener {
	constructor(client: Client) {
		super("messageReactionAdd", {
			emitter: "client",
			event: "messageReactionAdd",
			category: "client",
		});
		this.client = client;
	}

	exec(messageReaction: MessageReaction): Promise<Message> {
		const message = messageReaction.message;

		const starboard = {
			emoji: "⭐",
			count: 3,
			channel: null,
		};
		const data = this.client.guilddata.ensure(message.guild.id, starboard, "starboard");
		let i = 0;
		for (const reaction of message.reactions.cache) {
			if (data.channel) {
				if (data.emoji == reaction[0]) i++;
			}
		}
		if (i == data.count) {
			return (this.client.channels.cache.get(data.channel) as TextChannel).send(
				this.client.util
					.embed()
					.setAuthor(message.author.tag, message.author.avatarURL())
					.setColor(this.client.colors.default)
					.setDescription(message.content)
					.addField("Jump to message", `[clickhere](https://malil.discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
			);
		}
	}
}
