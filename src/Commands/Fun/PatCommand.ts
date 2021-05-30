import Command from "../../Classes/malilCommand";
import type { Message, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
import c from "petitio";
export default class PatCommand extends Command {
	constructor() {
		super("pat", {
			aliases: ["pat", "patpat", "pet"],
			category: "Fun",
			quoted: true,
			slash: true,
			args: [
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
						else return content.split(" ")[0];
					},
					match: "content",
				},
			],
			options: [
				{
					type: 6,
					name: "user",
					description: "user you want to be patted",
					required: false,
				},
				{
					type: 3,
					name: "ign",
					description: "in game name of th euser you want to have patted",
					required: false,
				},
			],
			description: {
				content: "MOCK_DESCRIPTION_CONTENT",
				example: "MOCK_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { user, ign }: { user: string | GuildMember; ign: string }): Promise<Message> {
		if (!user) user = ign;
		let image: string;
		if (!user) image = message.author.avatarURL({ dynamic: false, format: "png" });
		else if (typeof user == "string") {
			const res = await (await c("https://api.mojang.com/users/profiles/minecraft/" + user, "GET").send()).json();
			if (res !== null) {
				image = `https://mc-heads.net/head/${res.id}`;
			} else {
				return message.reply("User not found");
			}
		} else {
			if (user) {
				image = (user as GuildMember)?.user?.displayAvatarURL({ dynamic: false, format: "png" });
			} else {
				return message.reply("User not found");
			}
		}
		const gif = await c("https://pet.skyblockdev.repl.co/api/pet/", "GET").query("url", image).send();
		const patted = Buffer.from(gif.body.toString(), "base64");
		return message.reply({ content: "patting", files: [{ attachment: patted, name: `patted.gif` }] });
	}
}
