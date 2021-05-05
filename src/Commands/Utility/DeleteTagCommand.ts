import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";

export default class DeleteTagCommand extends Command {
	public constructor() {
		super("deletetag", {
			aliases: ["deletetag", "-tag"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "Delete a tag",
				usage: "deletetag",
				example: ["deletetag <name>"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }) {
		if (!message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_MESSAGES"))
			return message.util.send("Sorry you dont hae the required permissions to use this command");
		await this.client.tags.ensure(message.guild.id, {});
		args = args.split(" ");

		const input = args.slice(1).join(" ");
		if (!input) message.util.send("Please mention a tag to delete");
		await this.client.tags.ensure(message.guild.id, {});
		if (!(await this.client.tags.get(message.guild.id, args[0]))) message.util.send("Tag not found");
		await this.client.tags.delete(message.guild.id, args[0]);
		const embed = new MessageEmbed().setColor(this.client.colors.red).setTitle("Tag deleted.");
		message.util.send(embed);
	}
}
