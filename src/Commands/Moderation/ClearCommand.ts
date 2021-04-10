import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, Message } from "discord.js";
export default class ClearCommand extends Command {
	public constructor() {
		super("clear", {
			aliases: ["clear", "clean"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "to clear messages from the chat",
				usage: "clear",
				example: ["clear"],
			},
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
		});
	}

	public async exec(message: Message, { args }): Promise<Message | void> {
		const num = args;
		const deleteCount = parseInt(args, 10) + 1;
		if (!deleteCount || deleteCount < 1 || deleteCount > 100) return message.util.send("Please provide a number between 1 and 99 for the number of messages to delete");

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		});
		await (message.channel as TextChannel).bulkDelete(fetched).catch((error) => message.util.send(`Couldn't delete messages because of: ${error}`));

		const embeds = new MessageEmbed().setColor(this.client.consts.colors.red).setDescription(`deleted ${num} messages`);
		return message.channel.send(embeds).catch(console.error);
	}
}
