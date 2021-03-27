import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { GetMember } from "../../lib/Utils";
import centra from "centra";
export default class AmeticaCommand extends Command {
	public constructor() {
		super("america", {
			aliases: ["america", "ame"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "america something or yourself doesnt work on attachment links only real attachments sorry",
				usage: "america",
				example: ["america @user"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
			typing: true,
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message) {
		const msg = await message.util.send("<a:loading:820592866685485076>");

		const member = (await GetMember(message)) || message.member;

		const url = member.user.displayAvatarURL({
			size: 512,
			format: "png",
			dynamic: true,
		});

		const res = await centra(`https://api.dagpi.xyz/image/america/?url=${url}`, "get").header("Authorization", this.client.credentials.dagpi).send();
		const meme = res.body;

		await message.util.send("", {
			files: [{ attachment: meme, name: `America.png` }],
		});
		msg.delete();
	}
}
