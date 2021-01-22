import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class DecodeCommand extends Command {
    public constructor() {
        super("decode", {
            aliases: ["decode"],
            category: "Core",
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
        .addFields(
            { name: 'ascii', value: Buffer.from(args, 'ascii').toString() || 'none'},
            { name: 'utf8', value: Buffer.from(args, 'utf8').toString() || 'none'},
            { name: 'utf16le/ucs2', value: Buffer.from(args, 'ucs2').toString() || 'none'},
            { name: 'base64', value: Buffer.from(args, 'base64').toString() || 'none' },
            { name: 'binary', value: Buffer.from(args, 'binary').toString() || 'none' },
            { name: 'hex', value: Buffer.from(args, 'hex').toString() || 'none'}, 
        )
        message.channel.send(embed)
            //Buffer.from.alloc(args, 'hex').toString()
    }
}