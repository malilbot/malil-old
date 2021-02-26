import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../lib/Utils";
export default class ClapCommand extends Command {
    public constructor() {
        super("clap", {
            aliases: ["clap"],
            category: "Fun",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                    default: "Me When No Arguments"
                }
            ],
            description: {
                content: "👏Clap👏on👏the👏text.👏",
                usage: "clap",
                example: [
                    "clap"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        message.channel.send('👏' + (await fixword(args.replace('/\s+/g', '👏').replace('@', '@​').split(' ').join('👏'))) + '👏')


    }
}