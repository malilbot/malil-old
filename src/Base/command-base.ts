/*


import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";

export default class replacemeCommand extends Command {
    public constructor() {
        super("replaceme", {
            aliases: ["replaceme"],
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
                usage: "replaceme",
                example: [
                    "replaceme"
                ]
            },
            clientPermissions: ['SEND_MESSAGES'],
            ratelimit: 3,
            channel: "guild"
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message, { args }) {


    }
}


*/
