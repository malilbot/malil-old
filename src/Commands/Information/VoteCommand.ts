//https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/vote.markdown
import Command from "../../Classes/malilCommand";
import petitio from "petitio";
import type { Message, CommandInteraction } from "discord.js";

export default class VoteCommand extends Command {
	constructor() {
		super("vote", {
			aliases: ["vote", "votes"],
			category: "Info",
			quoted: true,
			description: {
				content: "VOTE_DESCRIPTION_CONTENT",
				example: "VOTE_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	async exec(message: Message): Promise<Message> {
		const embed = this.client.util
			.embed()
			.setTitle("Vote lists")
			.setThumbnail(this.client.user.avatarURL())
			.setTimestamp()
			.setColor(this.client.colors.default)
			.setDescription(
				"[topgg](https://top.gg/bot/749020331187896410/vote), (increases iq)\n" +
					"[discordbotlist.com](https://discordbotlist.com/bots/malil/upvote),\n" +
					"[BladeBots](https://bladebotlist.xyz/bot/749020331187896410/vote),\n" +
					"[fateList](https://fateslist.xyz/bot/749020331187896410/vote)"
			);
		return message.util.send(embed);
	}
	async execSlash(message: CommandInteraction) {
		return message.reply(
			this.client.util
				.embed()
				.setTitle("Vote lists")
				.setThumbnail(this.client.user.avatarURL())
				.setTimestamp()
				.setColor(this.client.colors.default)
				.setDescription(
					"[topgg](https://top.gg/bot/749020331187896410/vote), (increases iq)\n" +
						"[discordbotlist.com](https://discordbotlist.com/bots/malil/upvote),\n" +
						"[BladeBots](https://bladebotlist.xyz/bot/749020331187896410/vote),\n" +
						"[fateList](https://fateslist.xyz/bot/749020331187896410/vote)"
				)
		);
	}
}
