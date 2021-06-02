import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
import petitio from "petitio";
export default class shortenCommand extends Command {
	constructor() {
		super("shorten", {
			aliases: ["short", "shorten"],
			category: "General",
			args: [
				{
					id: "link",
					type: "string",
					match: "rest",
				},
			],
			options: [
				{
					type: 3,
					name: "link",
					description: "The link you want to shorten",
					required: false,
				},
			],

			clientPermissions: ["SEND_MESSAGES"],
			slash: true,
			ratelimit: 1,
		});
	}

	async exec(message: Message, { link }: { link: string }): Promise<Message> {
		if (!link) return message.reply("Please provide a link");
		if (!link.startsWith("https://")) return message.reply("Thats not a link");
		const res = await petitio(`https://api.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?url=${encodeURIComponent(link)}`, "GET").send();
		const embed = this.client.util.embed().setDescription(res.body.toString("utf8")).setAuthor(message.author.tag, message.author.avatarURL()).setColor(this.client.colors.red);
		message.reply(embed);
	}
}
