import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class voteCommand extends Command {
	constructor() {
		super("vote", {
			name: "vote",
			description: "Sends the links you can use to vote for malil",
		});
	}

	async exec(message: CommandInteraction) {
		return message.reply(
			this.client.util
				.embed()
				.setTitle("Vote lists")
				.setThumbnail(this.client.user.avatarURL())
				.setTimestamp()
				.setColor(this.client.consts.colors.default)
				.setDescription(
					"[topgg](https://top.gg/bot/749020331187896410/vote), (increases iq)\n" +
						"[discordbotlist.com](https://discordbotlist.com/bots/malil/upvote),\n" +
						"[BladeBots](https://bladebotlist.xyz/bot/749020331187896410/vote),\n" +
						"[fateList](https://fateslist.xyz/bot/749020331187896410/vote)"
				)
		);
	}
}
