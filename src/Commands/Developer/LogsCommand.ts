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
        let data = readFileSync(join(__dirname, "..", "..", "..", "Logs", lastItem), 'utf8');

        data = data
            .toString()
            .replace(/\s\s+/g, ' ')
            .replace(/\u001b\[.*?m/g, "")
            .replace(/.*/, "")
            .slice(-800)
            .substr(1)


        message.reply(await (hst(data)));
    }
}