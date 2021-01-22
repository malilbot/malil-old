import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class DecodeCommand extends Command {
    public constructor() {
        super("decode", {
            aliases: ["decode"],
            category: "Utility",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                    default: "none"
                }
            ],
            description: {
                content: "",
                usage: "decode",
                example: [
                    "decode"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        let embed = new MessageEmbed()
        .setTitle("Decode things")
        .setDescription('input: ' + args || 'none')
        .addFields(
            { name: 'ascii', value: Buffer.from(args, 'ascii').toString() || 'none', inline: true},
            { name: 'utf8', value: Buffer.from(args, 'utf8').toString() || 'none', inline: true},
            { name: '\u200B', value: '\u200B' },
            { name: 'utf16le/ucs2', value: Buffer.from(args, 'ucs2').toString() || 'none', inline: true},
            { name: 'base64', value: Buffer.from(args, 'base64').toString() || 'none', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'binary', value: Buffer.from(args, 'binary').toString() || 'none', inline: true },
            { name: 'hex', value: Buffer.from(args, 'hex').toString() || 'none', inline: true}, 
        )
        message.channel.send(embed)
            //Buffer.from.alloc(args, 'hex').toString()
    }
}