import Command from "../../Classes/malilCommand";
import type { Message, CommandInteraction } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../Lib/Utils";

export default class EightballCommand extends Command {
	constructor() {
		super("8ball", {
			aliases: ["eightball", "8ball", "ask"],
			category: "Fun",
			quoted: false,
			slash: true,
			args: [
				{
					id: "question",
					match: "content",
				},
			],
			options: [
				{
					type: 3,
					name: "question",
					description: "question you want to ask the magic 8ball",
					required: true,
				},
			],
			description: {
				content: "EIGHTBALL_DESCRIPTION_CONTENT",
				example: "EIGHTBALL_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { question }: { question: string }): Promise<void | Message> {
		if (!question) return message.reply("Please ask a question for the magic 8ball");
		const replies =
			"yes.|no.|maybe.|yes an' definitely.|it be certain.|as I spy it, aye.|very doubtful.|eh I will say aye to that there.|no!|yes - definitely.|most likely.|never.|better not tell ye now|my sources say no|nope.|scientifically aye.|yes.|no.|maybe.|yes and definitewy.|it is cewtain.|as i see it, yes.|vewy douwbtfuww.|eh i wiww say yes to that.|no!|yes - definitewy.|most wikewy.|nevew.|bettew not teww u now|my souwwces say no|nope.|scientificawwy yes.|YEZ.|NO.|MAYBE.|YEZ AN DEFINITELY.|IT CERTAIN.|AS I C IT, YEZ.|VRY DOUBTFUL.|EH IM GONNA SAY YEZ 2 DAT.|NO!|YEZ - DEFINITELY.|MOST LIKELY.|NEVR.|BETTR NOT TELL U NAO|MAH SOURCEZ SAY NO|NOPE.|SCIENTIFICALLY YEZ.|Yes.|No.|Maybe.|Yes and definitely.|It is certain.|As I see it, yes.|Very doubtful.|Eh I will say yes to that.|NO!|Yes - definitely.|Most likely.|Never.|Better not tell you now|My sources say no|Nope.|Scientifically yes.".split(
				"|"
			);
		const result = Math.floor(Math.random() * replies.length);

		return message.reply(
			this.client.util.embed().setAuthor(message.author.tag).setColor(this.client.colors.purple).addField("Question", question).addField("Answer", replies[result]).setFooter(`Magic 8ball`)
		);
	}
}
