//https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/todo.markdown
import { Command } from "discord-akairo";
import centra from "centra";
import { MessageEmbed, Message } from "discord.js";

export default class TodoCommand extends Command {
	public constructor() {
		super("todo", {
			aliases: ["todo"],
			category: "Info",
			quoted: true,
			description: {
				content: "",
				usage: "todo",
				example: ["todo"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		const res = await (await centra("https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/TODO.md", "GET").header("User-Agent", "Malil").send()).text();
		const todo = res.replace("### TODO LIST", "").replace("### TODO", "").replace(/\[ \]/gi, "").replace(/\[X]/gi, "").split("-").slice(3).join("-").replace(/\n\n/g, "");
		message.channel.send(new MessageEmbed().addField("TODO:", "- " + todo).setColor(this.client.consts.colors.default));
	}
}
