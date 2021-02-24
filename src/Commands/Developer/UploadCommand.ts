import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { CreateGist, hst } from "../../lib/Utils";

export default class UploadCommand extends Command {
	public constructor() {
		super("upload", {
			aliases: [
				"upload"
			],
			category: "Developer",
			description: {
				content: "Who the fuck knows",
				usage: "Secret info",
				example: [
					"yes"
				]
			},
			ratelimit: 3,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest"
				}
			],
			superUserOnly: true,
			channel: "guild"
		});
	}
	public async exec(message: Message, { code }) {
		const first = code.split(" ").slice(1).toString().replace(/,/g, " ");
		const term = code.split(" ");
		if (term[0] == "hst" || term[0] == "haste" || term[0] == "bin") {
			message.reply(
				new MessageEmbed()
					.setColor(this.client.setting.colors.green)
					.addField("Upload", await hst(first)), { allowedMentions: { repliedUser: false } }
			);
		} else if (term[0] == "gist" || term[0] == "github") {
			if (message.author.id !== "336465356304678913") return;
			message.reply(
				new MessageEmbed()
					.setColor(this.client.setting.colors.green)
					.addField("Upload", "https://gist.github.com/" + (await CreateGist("upload", first, this.client))), { allowedMentions: { repliedUser: false } }
			);
		} else message.reply("Please mention a platform");
	}
}
