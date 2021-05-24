import Command from "../../Classes/malilCommand";
import { GuildMember, Message } from "discord.js";
import { GetMember } from "../../Lib/Utils";
import centra from "centra";
export default class AmeticaCommand extends Command {
	constructor() {
		super("america", {
			aliases: ["america", "ame"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
			],
			description: {
				content: "AMERICA_DESCRIPTION_CONTENT",
				example: "AMERICA_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
			typing: true,
		});
	}

	async exec(message: Message, { member }: { member: GuildMember }): Promise<void> {
		const msg = await message.util.send("<a:loading:820592866685485076>");

		const url = member.user.displayAvatarURL({
			size: 512,
			format: "png",
			dynamic: false,
		});

		const res = await centra(`https://api.dagpi.xyz/image/america/?url=${url}`, "get").header("Authorization", this.client.credentials.dagpi).send();
		const meme = res.body;

		await message.util.send("", {
			files: [{ attachment: meme, name: `America.png` }],
		});
		msg.delete();
	}
}
