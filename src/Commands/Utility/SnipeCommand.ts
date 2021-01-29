import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import * as db from 'quick.db'
import moment from 'moment';

export default class SnipeCommand extends Command {
    public constructor() {
        super("snipe", {
            aliases: ["snipe"],
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
        let content = db.get(`snipe.${message.guild.id}.${message.channel.id}.content`)
        if(!content) return message.reply("No Snipes found in this channel")
        let author = db.get(`snipe.${message.guild.id}.${message.channel.id}.author`)
        if(!author) return message.reply("No Snipes found in this channel")
        const Embed = new MessageEmbed()
        .setColor('#8E44AD')    
        .setTitle(`Snipe: ${author}`)
        .setDescription(`${content}`)
        message.channel.send(Embed)

    }
}