import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import centra from "centra"
export default class FedoraCommand extends Command {
    public constructor() {
        super("fedora", {
            aliases: ["fedora"],
            category: "Utility",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                }
            ],
            description: {
                content: "",
                usage: "fedora",
                example: [
                    "fedora"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message, { args }) {
        /*
        const res = await (await centra("https://api.dagpi.xyz/image/colors/?url=https://media.discordapp.net/attachments/755166644451541229/810979329379008557/image0.png", "get")
            //.query("url", "https://media.discordapp.net/attachments/755166644451541229/810979329379008557/image0.png")
            .header("User-Agent", "Malil")
            .header("authorization", `tricked`)
            .send()).json();
        console.log(res)
        */
    }
}