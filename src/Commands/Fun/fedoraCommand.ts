import Command from "../../Classes/malilCommand";
import type { GuildMember, Message, CommandInteraction } from "discord.js";
import { GetMember } from "../../Lib/Utils";
import centra from "centra";
export default class FedoraCommand extends Command {
	constructor() {
		super("fedora", {
			aliases: ["fedora"],
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

	async exec(message: Message, { member }: { member: GuildMember }): Promise<void> {
		const msg = await message.util.send("<a:loading:820592866685485076>");
		const url = member.user.displayAvatarURL({
			size: 512,
			format: "png",
			dynamic: false,
		});

		const res = await centra(`https://api.dagpi.xyz/image/fedora/?url=${url}`, "get").header("Authorization", this.client.credentials.dagpi).send();
		await message.util.send("", {
			files: [{ attachment: res.body, name: `fedoraed.png` }],
		});
		msg.delete();
	}
	async execSlash(message: CommandInteraction) {
		const member = message.options[0]?.user ?? message.user;
		const res = await centra(`https://api.dagpi.xyz/image/fedora/?url=${member.avatarURL({ dynamic: false, format: "png" })}`, "get")
			.header("Authorization", this.client.credentials.dagpi)
			.send();
		return message.reply({ content: "here ya go", files: [{ attachment: res.body, name: `Fedora'd.png` }] });
	}
}
