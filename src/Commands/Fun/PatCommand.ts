import Command from "../../Classes/malilCommand";
import type { Message, GuildMember, CommandInteraction } from "discord.js";
import { fixword, GetMember } from "../../Lib/Utils";
import c from "centra";
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
				{
					type: 4,
					name: "speed",
					description: "The pat speed between 1 and 200",
					required: false,
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
		//return message.reply("WILL BE BACK SOON");
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
		const gif = await c("https://pet.skyblockdev.repl.co/api/pet/", "GET").query("url", image).send();
		const patted = Buffer.from(gif.body.toString(), "base64");
		return message.reply({ content: "patting", files: [{ attachment: patted, name: `patted.gif` }] });
	}
	async execSlash(message: CommandInteraction) {
		return message.reply("WILL BE BACK SOON");
		let image: string;
		let speed: number = (message.options.find((i) => i.name == "speed")?.value as number) || 20;
		const ign = message.options.find((i) => i.name == "ign")?.value;
		let user = message.options.find((i) => i.name == "user")?.user;
		if (ign && user) {
			message.reply("You must only give an ign or a user, not both");
		} else if (ign) {
			const res = await (await c("https://api.mojang.com/users/profiles/minecraft/" + ign, "GET").send()).json();
			if (res !== null) {
				image = `https://mc-heads.net/head/${res.id}`;
			} else {
				message.reply("User not found");
			}
		} else {
			user = user || message.user;
			image = user.displayAvatarURL({ dynamic: false, format: "png" });
		}
		const gif = await c("https://pet.skyblockdev.repl.co/api/pet/", "GET").query("url", image).send();
		const patted = Buffer.from(gif.body.toString(), "base64");
		return message.reply({ content: "patting", files: [{ attachment: patted, name: `patted.gif` }] });
	}
}
