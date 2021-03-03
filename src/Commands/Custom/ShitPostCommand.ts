
import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class ShitPostCommand extends Command {
    public constructor() {
        super("shitPost", {
            aliases: ["shitPost"],
            category: "Custom",
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
                usage: "shitPost",
                example: [
                    "shitPost"
                ]
            },
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES'],
            ratelimit: 3,
            channel: "guild"
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message, { args }) {
        const split = args.split(" ")
        if (split[0] == "remove") {
            const arr = this.client.gp.get("shitpost")
            for (let i = 0; i < arr.length; i++) {

                if (arr[i] == split[1]) {

                    arr.splice(i, 1);
                }

            }
            this.client.gp.set("shitpost", arr)
        }
        this.client.gp.push("shitpost", args)


    }
}
