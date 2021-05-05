//https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/credits.markdown
import Command from "../../Classes/malilCommand";
import centra from "centra";
import { MessageEmbed, Message } from "discord.js";

export default class CreditsCommand extends Command {
	public constructor() {
		super("credits", {
			aliases: ["credits", "credit"],
			category: "Info",
			quoted: true,
			description: {
				content: "Credits to everyone who has contributed to the bot",
				example: ["credits"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	public async exec(message: Message): Promise<void> {
		const res = await (await centra("https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/CREDITS.md", "GET").header("User-Agent", "Malil").send()).text();
		const body = res.replace(/### credits/g, "").replace(/###/g, "");

		message.util.send(new MessageEmbed().addField("Credits", body).setColor(this.client.colors.orange));
	}
}
