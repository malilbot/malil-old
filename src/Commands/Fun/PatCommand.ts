import { Command } from "discord-akairo";
import { MessageEmbed, Message, GuildMember } from "discord.js";
import { fixword, GetMember } from "../../Lib/Utils";
import c from "centra";
import petPetGif from "pet-pet-gif";
export default class PatCommand extends Command {
	public constructor() {
		super("pat", {
			aliases: ["pat", "patpat", "pet"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
						else return content.split(" ")[0];
					},
					match: "content",
				},
				{
					id: "color",
					type: async (_, content) => {
						return content.split(" ")[1];
					},
					match: "content",
				},
			],
			description: {
				content: "You can pat a minecraft head or a discord user with this command",
				example: ["pat", "pat steve", "pat @user"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { member, color }: { member: string | GuildMember; color: string }): Promise<Message> {
		let image: string;
		if (!member) image = message.author.avatarURL({ dynamic: false, format: "png" });
		else if (typeof member == "string") {
			const res = await (await c("https://api.mojang.com/users/profiles/minecraft/" + member, "GET").send()).json();
			if (res !== null) {
				image = `https://mc-heads.net/head/${res.id}`;
			} else {
				return message.reply("User not found");
			}
		} else {
			if (member) {
				image = (member as GuildMember)?.user?.displayAvatarURL({ dynamic: false, format: "png" });
			} else {
				return message.reply("User not found");
			}
		}
		return message.reply({ content: "patting", files: [{ attachment: await petPetGif(image, color || null), name: `patted.gif` }] });
	}
}
