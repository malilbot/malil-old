import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
import centra from "centra";
import { MessageEmbed } from "discord.js";
export default class shortenCommand extends Command {
	constructor() {
		super("shorten", {
			aliases: ["short", "shorten"],
			category: "General",
			args: [
				{
					id: "args",
					type: "string",
					match: "rest",
				},
			],
			description: {
				content: "Makes your link shorter",
				example: ["short https://google.com", "short https://discord.gg/skytils"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ownerOnly: false,
			typing: true,
			ratelimit: 1,
		});
	}

	async exec(message: Message, { args }): Promise<Message> {
		//full_short_link
		if (!args) return message.util.send("Please provide a link");
		if (!args.startsWith("https://")) return message.util.send("Thats not a link");
		const msg = await message.util.send(new MessageEmbed().setFooter("FETCHING"));
		const res = await (await centra(`https://api.shrtco.de/v2/shorten?url=${args}`, "GET").send()).json();
		if (res.ok !== true) return message.util.send("This link is unsupported or blacklisted");
		const embed = new MessageEmbed()
			.setFooter("Powered by app.shrtco.de <3")
			.setTitle("Sucessfully shorten the url.")
			.addField("app.shrtco.de", `https://${res.result.short_link}`)
			.addField("9qr.de", `https://${res.result.short_link2}`)
			.addField("shiny.link", `https://${res.result.short_link3}`);
		msg.edit(embed);
	}
}
