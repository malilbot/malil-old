import Command from "../../Classes/malilCommand";
import { MessageEmbed, GuildChannel, TextChannel, Message } from "discord.js";
export default class ClearCommand extends Command {
	constructor() {
		super("clear", {
			aliases: ["clear", "clean", "purge"],
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
				content: "CLEAR_DESCRIPTION_CONTENT",
				example: "CLEAR_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			channel: "guild",
			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
		});
	}

	async exec(message: Message, { args }): Promise<Message | void> {
		const num = args;
		const deleteCount = parseInt(args, 10) + 1;
		if (!deleteCount || deleteCount < 1 || deleteCount > 100) return message.reply("Please provide a number between 1 and 99 for the number of messages to delete");

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		});
		await (message.channel as TextChannel).bulkDelete(fetched).catch((error) => message.reply(`Couldn't delete messages because of: ${error}`));

		const embeds = new MessageEmbed().setColor(this.client.colors.red).setDescription(`deleted ${num} messages`);
		return message.channel.send(embeds).catch(console.error);
	}
}
