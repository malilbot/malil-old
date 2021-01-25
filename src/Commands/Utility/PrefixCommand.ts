import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import * as db from 'quick.db'
export default class PrefixCommand extends Command {
    public constructor() {
        super("prefix", {
            aliases: ["prefix"],
            category: "Utility",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "string",
                    match: "rest",
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
        if(!args || args.length == 0 || args.size == 0) {
            if(db.get(`guild.${message.guild.id}.pf`)){
                let item = db.get(`guild.${message.guild.id}.pf`)
                if(item) return message.channel.send('my prefix is ' + item)
            }else return message.channel.send('my prefix is *')
            
        } else {
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you need to be a 'ADMINISTRATOR' to use this command")
            db.set(`guild.${message.guild.id}.pf`, args)
            message.channel.send("Updated the prefix to " + args)
        }
    }
}