import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class PrefixCommand extends Command {
    public constructor() {
        super("prefix", {
            aliases: ["prefix"],
            category: "Utility",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            description: {
                content: "Find your 8ball",
                usage: "prefix",
                example: [
                    "prefix"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {

    }
}