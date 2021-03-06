import Command from "../../Classes/malilCommand";
import { GuildMember, Message, MessageAttachment } from "discord.js";
import { hst, GetMember } from "../../Lib/Utils";
import c from "petitio";
export default class AsciifyCommand extends Command {
	constructor() {
		super("asciify", {
			aliases: ["asciify", "ascii", "assci", "asccii", "asci", "aci"],
			args: [
				{
					id: "member",
					type: async (message, content) => {
						const member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
			],
			category: "General",
			quoted: true,
			description: {
				content: "ACI_DESCRIPTION_CONTENT",
				example: "ACI_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
		let url: string | MessageAttachment;

		message.attachments.forEach((attachment) => {
			url = attachment;
		});
		if (!url) {
			url = member.user.displayAvatarURL({
				size: 512,
				format: "png",
				dynamic: false,
			});
		}
		if (!url) return message.reply("please add a image attachment");

		const gif = await (await c("https://pet.skyblockdev.repl.co/api/asciify/", "GET").query("url", url).send()).json();
		const link = await hst(gif.out);
		message.reply("Success " + link, { allowedMentions: { repliedUser: false } });
	}
}
