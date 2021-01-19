import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class DmCommand extends Command {
    public constructor() {
        super("dm", {
            aliases: ["dm"],
            category: "Developer",
            quoted: true,
            args: [
                {
                    id: "user",
                    type: "member",
                    match: "restContent"
                },
                {
                    id: "args",
                    type: "content",
                    match: "rest",
                },

            ],
            description: {
                content: "dm's a user",
                usage: "dm",
                example: [
                    "dm"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            ownerOnly: true
        });
    }

    public async exec(message: Message, { args, user }) {
        user.send(args)


    }
}