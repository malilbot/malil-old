import Command from "../../Classes/malilCommand";
import { GuildMember, Message, MessageAttachment } from "discord.js";
import asciify from "asciify-image";
import { hst, GetMember } from "../../Lib/Utils";
export default class AsciifyCommand extends Command {
	public constructor() {
		super("asciify", {
			aliases: ["asciify", "ascii", "assci", "asccii", "asci", "aci"],
			args: [
				{
					id: "big",
					type: "boolean",
					flag: "--big",
					match: "flag",
				},

				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						return member || message.member;
					},
					match: "content",
				},
			],
			category: "General",
			quoted: true,
			description: {
				content: "Turn a image into a ascii",
				example: ["asciify then a attachment"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public async exec(message: Message, { big, member }: { big: boolean; member: GuildMember }): Promise<Message> {
		const options = {
			fit: "box",
			width: 64,
			height: 64,
			color: false,
		};
		const bigoptions = {
			fit: "box",
			width: 128,
			height: 128,
			color: false,
		};
		let url: string | MessageAttachment;
		let text = true;

		message.attachments.forEach((attachment) => {
			url = attachment;
		});
		if (!url) {
			text = false;
			url = member.user.displayAvatarURL({
				size: 512,
				format: "png",
				dynamic: true,
			});
		}
		if (!url) return message.util.send("please add a image attachment");
		const option = big ? bigoptions : options;

		asciify(url, option, async function (err: Error, asciified: string) {
			if (err) return message.util.send("Unsupported file type");
			let sentence: string;
			if (text == true) sentence = "Success! " + (await hst(asciified)) + ".txt";
			else if (text == false) sentence = "Success! " + (await hst(asciified)) + ".txt \nProtip: You can add a image and it will asiifyy that";
			else sentence = "Idk what happend but no image arrived";
			message.util.send(sentence, { allowedMentions: { repliedUser: false } });
		});
	}
}
