//https://raw.githubusercontent.com/SkyBlockDev/malil-akairo/main/vote.markdown
import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";

export default class VoteCommand extends Command {
	constructor() {
		super("vote", {
			slash: true,
			aliases: ["vote", "votes"],
			category: "Info",
			quoted: true,
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
				"[topgg](https://top.gg/bot/749020331187896410/vote)\n" +
					"[discordbotlist.com](https://discordbotlist.com/bots/malil/upvote),\n" +
					"[BladeBots](https://bladebotlist.xyz/bot/749020331187896410/vote),\n" +
					"[fateList](https://fateslist.xyz/bot/749020331187896410/vote)"
			);
		return message.reply(embed);
	}
}
