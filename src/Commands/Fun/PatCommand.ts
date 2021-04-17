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
						console.log(content);
						let member = await GetMember(message, content);
						if (member) return member;
						else return content;
					},
					match: "content",
				},
			],
			description: {
				content: "You can pat a minecraft head or a discord user with this command",
				usage: "pat",
				example: ["pat"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { member }: { member: string | GuildMember }): Promise<Message> {
		let image: string;
		console.log(member);
		if (typeof member == "string") {
			const res = await (await c("https://api.mojang.com/users/profiles/minecraft/" + member, "GET").send()).json();
			if (res !== null) {
				image = `https://crafatar.com/renders/head/${res.id}`;
			} else {
				return message.reply("User not found");
			}
		} else {
			image = (member as GuildMember).user.displayAvatarURL({ dynamic: false, format: "png" });
		}

		return message.reply({ content: "patting", files: [{ attachment: await petPetGif(image || message.author.avatarURL({ dynamic: false, format: "png" })), name: `patted.gif` }] });
	}
}
