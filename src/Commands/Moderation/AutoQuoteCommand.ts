import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import * as db from 'quick.db'

export default class AutoQuoteCommand extends Command {
    public constructor() {
        super("autoquote", {
            aliases: ["autoquote", "aq"],
            category: "Moderation",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "content",
                    match: "rest",
                }
            ],
            description: {
                content: "",
                usage: "autoquote",
                example: [
                    "autoquote list",
                    "aq list",
                    "aq off",
                    "aq <role id>"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        if(args == 'list'){
            message.reply(db.fetch(`${message.guild.id}.aq`))
        }
        else if(args == 'off' || args == 'none' || args == 'delete') {
            message.reply('are you sure you want to delete the AutoQuote list [y/n]')

            const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });

            collector.on('collect', m => {
                if(m.content == 'yes' || m.content == 'y'){
                    db.delete(`${message.guild.id}.aq`)
                    return message.reply('Ok deleted it.')
                } else if(m.content == 'no' || m.content == 'n'){
                    return message.reply("action cancelled.")
                } else {
                    return message.reply("Not sure what you meant with that one just gonna cancel it.")
                }
            });

            collector.on('end', collected => {
                let ew = (collected.size)
                if(ew == 0){
                    return message.reply("Time ran out.")
                }
            });
        } else{
        let role = message.guild.roles.fetch(args)

        if(await role){
            //console.log(db.all())
            if (!Array.isArray(db.get(`${message.guild.id}.aq`))) db.set(`${message.guild.id}.aq`, [])
            //console.log(args)
            message.reply(`Set ${await role} autoquote`)
            db.push(`${message.guild.id}.aq`, args)
            //console.log('------------------')   
            // console.log(await db.get(`${message.guild.id}.aq`))
            //console.log('------------------------')
        } else {
            message.reply('Role not found.')
        }
        }

        


    }
}