import { Command } from "discord-akairo";
import { Message } from "discord.js";
import centra from "centra";
import { MessageEmbed } from "discord.js";
export default class shortenCommand extends Command {
	public constructor() {
		super("shorten", {
			aliases: ["short", "shorten"],
			category: "General",
			args: [
				{
					id: "args",
					type: "string",
					match: "rest"
				}
			],
			description: {
				content: "Show short and latency bot",
				usage: "short",
				example: ["short"]
			},
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			typing: true,
			ratelimit: 1
		});
	}

	public async exec(message: Message, { args }) {
		//full_short_link
		if (!args.startsWith("https://")) return message.channel.send("Thats not a link");
		const msg = await message.channel.send(new MessageEmbed().setFooter("FETCHING"));
		const res = await (await centra(`https://api.shrtco.de/v2/shorten?url=${args}`, "GET").send()).json();
		if (res.ok !== true) return message.reply("This link is unsupported or blacklisted");
		const embed = new MessageEmbed()
			.setFooter("Powered by app.shrtco.de <3")
			.setTitle("Sucessfully shorten the url.")
			.addField("app.shrtco.de", `https://${res.result.short_link}`)
			.addField("9qr.de", `https://${res.result.short_link2}`)
			.addField("shiny.link", `https://${res.result.short_link3}`);
		msg.edit(embed);
	}
}
