import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageManager } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class EncodeCommand extends Command {
    public constructor() {
        super("encode", {
            aliases: ["encode"],
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
                usage: "encode",
                example: [
                    "encode"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        let embed = new MessageEmbed()
        .setTitle("Encode things")
        .addFields(
            { name: 'ascii', value: new Buffer(args).toString('ascii') || 'none' },
            { name: 'utf8', value: new Buffer(args).toString('utf8') || 'none' },
            { name: 'utf16le/ucs2', value: new Buffer(args).toString('ucs2') || 'none' },
            { name: 'base64', value: new Buffer(args).toString('base64') || 'none' },
            { name: 'binary', value: new Buffer(args).toString('binary') || 'none' },
            { name: 'hex', value: new Buffer(args).toString('hex') || 'none' },
        )
        message.channel.send(embed)
       // const encoded = new Buffer(args).toString('hex'); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
       // const decoded = new Buffer(encoded, 'hex').toString(); // decoded === "This is my string to be encoded/decoded"
       // message.channel.send(encoded)
       // message.channel.send(decoded)

    }
}