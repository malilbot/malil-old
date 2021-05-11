import Command from "../../Classes/malilCommand";
import { MessageManager, Message, CommandInteraction } from "discord.js";
import { MessageEmbed } from "discord.js";
import { malilStartGiveaway } from "../../Lib/Utils";
export default class giveawayCommand extends Command {
	public constructor() {
		super("giveaway", {
			aliases: ["giveaway"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "option",
					type: (_, content) => {
						return content.split(" ")[0];
					},
					match: "content",
				},
			],
			description: {
				content: "Encode your message",
				usage: "encode",
				example: ["encode"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	async exec(message: Message, { option }) {
		return message.reply("Yes giveaways are comming soon be ready");
		if (!option) return message.reply("No option provided");
		else if (option == "create" || option == "start") {
		} else if (option == "end" || option == "stop") {
		} else if (option == "reroll") {
		} else {
			message.channel.send("please choose between create, end, reroll");
		}
	}
	//async execSlash(interaction: CommandInteraction) {}
	async create(message: Message | CommandInteraction) {}
	async end(message: Message | CommandInteraction) {}
	async reroll(message: Message | CommandInteraction) {}
}
