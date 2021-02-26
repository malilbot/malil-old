/* eslint-disable no-control-regex */
import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { readdirSync, readFileSync } from "fs"
import { hst } from "../../lib/Utils"
import { join } from "path";
export default class LogsCommand extends Command {
    public constructor() {
        super("logs", {
            aliases: ["logs"],
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
                usage: "logs",
                example: [
                    "logs"
                ]
            },
            ratelimit: 3,
            superUserOnly: true,
            channel: "guild"
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message) {
        const taskfiles = readdirSync(join(__dirname, "..", "..", "..", "Logs")).filter(file => file.endsWith('.log') && file.startsWith('malil'));
        const lastItem = taskfiles[taskfiles.length - 1]
        const data = readFileSync(join(__dirname, "..", "..", "..", "Logs", lastItem), 'utf8');

        let data2 = data
            .toString()
            .replace(/\s\s+/g, ' ')
            .replace(/\u001b\[.*?m/g, "")
        data2 = data2.substr(data2.length - 4000).replace(/.*/, "").substr(1)

        message.reply(await (hst(data2)));
    }
}