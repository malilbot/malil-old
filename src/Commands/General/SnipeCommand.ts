import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class SnipeCommand extends Command {
    public constructor() {
        super("snipe", {
            aliases: ["snipe"],
            category: "Core",
            quoted: true,
            description: {
                content: "Snipe the latest deleted message.",
                usage: "snipe",
                example: [
                    "snipe"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {



    }
}