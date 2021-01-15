
import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class UwuCommand extends Command {
    public constructor() {
        super("uwu", {
            aliases: ["uwu", "owo"],
            category: "Core",
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
                content: "Uwufy some text",
                usage: "Uwu",
                example: [
                    "Uwu"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
const faces = [`(・'ω'・)`, ';;w;;', 'owo', 'UwU', '>w<', '^w^', '0w0', '*w*']
    function Owoify(str) {
      return str
        .replace(/(?:r|l|h)/g, 'w')
        .replace(/(?:R|L|H)/g, 'W')
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'Ny$1')
        .replace(/ove/g, 'uv')
        .replace(/!+/g, ' ' + faces[Math.floor(Math.random() * faces.length)] + ' ')
    }


    // Get question to answer
    const text = message.content.split(' ').slice(1).join(' ')
    if (!text) { return message.reply(`**You need to specify a message..**`) }

    // Send message
    message.channel.send(`${Owoify(text)}`)


    }
}