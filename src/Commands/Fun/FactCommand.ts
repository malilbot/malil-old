import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { GetSelf } from "../../lib/Utils"
import centra from "centra"
export default class FactCommand extends Command {
    public constructor() {
        super("fact", {
            aliases: ["fact"],
            category: "Fun",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                }
            ],
            description: {
                content: "Searches the internet for a fact",
                usage: "fact",
                example: [
                    "fact"
                ]
            },
            ratelimit: 2,
            channel: "guild"
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message) {
        const res = await (await centra(`https://api.dagpi.xyz/data/fact`, "get")
            .header("Authorization", this.client.setting.dagpi)
            .send()).json()
        message.reply(res.fact, { allowedMentions: { repliedUser: false } })
    }
}