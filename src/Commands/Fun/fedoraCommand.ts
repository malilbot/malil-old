import Command from "../../Classes/malilCommand";
import type { GuildMember, Message, CommandInteraction } from "discord.js";
import { GetMember } from "../../Lib/Utils";
import petitio from "petitio";
export default class FedoraCommand extends Command {
	constructor() {
		super("fedora", {
			aliases: ["fedora"],
			category: "Fun",
			quoted: true,
			slash: true,
			args: [
				{
					id: "user",
					type: async (message, content) => {
						const member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
			],
			options: [
				{
					type: 6,
					name: "user",
					description: "user to fedora",
					required: false,
				},
			],
			description: {
				content: "FEDORA_DESCRIPTION_CONTENT",
				example: "FEDORA_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
			typing: true,
		});
	}

	async exec(message: Message, { user }: { user: GuildMember }): Promise<void> {
user = user || message.member
		const url = user.user.displayAvatarURL({
			size: 1024,
			format: "png",
			dynamic: false,
		});

		const res = await petitio(`https://api.dagpi.xyz/image/fedora/?url=${url}`, "GET")
			.header("Authorization", this.client.credentials.dagpi)
			.header("user-agent", "Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0")
			.send();
		await message.reply({
			files: [{ attachment: res.body, name: `fedoraed.png` }],
		});
	}
}
