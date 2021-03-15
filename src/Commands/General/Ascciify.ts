import { Command } from "discord-akairo";
import { Message } from "discord.js";
import asciify from "asciify-image";
import { hst, GetMember } from "../../lib/Utils";
export default class AsciifyCommand extends Command {
	public constructor() {
		super("asciify", {
			aliases: ["asciify", "ascii", "assci", "asccii", "asci", "aci"],
			args: [
				{
					id: "big",
					type: "string",
					flag: "--big",
					match: "option",
				},
			],
			category: "General",
			quoted: true,
			description: {
				content: "Turn a image into a ascii",
				usage: "asciify",
				example: ["asciify then a attachment"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public async exec(message: Message, { big }) {
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
		let url;
		if (message.attachments) {
			message.attachments.forEach((attachment) => {
				url = attachment;
			});
		}
		const member = (await GetMember(message)) || message.member;
		if (!url) {
			if (member)
				url = member.user.displayAvatarURL({
					size: 1024,
					format: "jpg",
					dynamic: true,
				});
		}
		if (!url) return message.reply("please add a image attachment");
		const option = big ? bigoptions : options;

		asciify(url, option, async function (err, asciified) {
			if (err) return message.reply("Unsupported file type");
			let sentence = "Success! " + (await hst(asciified)) + ".txt";
			if (member) sentence = "Success! " + (await hst(asciified)) + ".txt \nProtip: You can add a image and it will asiifyy that";
			message.reply(sentence, { allowedMentions: { repliedUser: false } });
		});
	}
}
