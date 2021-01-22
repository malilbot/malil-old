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
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);
        if(args == 'list'){
            let list = db.fetch(`${message.guild.id}.aq`)
            let messages = ''
            let msg = message.channel.send(db.fetch(`${message.guild.id}.aq`))
            list.forEach(function(entry) {
                message.guild.roles.fetch(entry).then(entry => messages += `${entry}\n`)
            });
            (await msg).edit(

                new MessageEmbed()
                .setAuthor(`Roles in the AutoQuote`, message.author.avatarURL())
                .setDescription(messages)
                .setFooter('These roles will get autoquoted.')
                .setTimestamp()

            );
            (await msg).edit("Fetched")
        }
        else if(args == 'off' || args == 'none' || args == 'delete') {
            message.channel.send('are you sure you want to delete the AutoQuote list [y/n]')

            const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });

            collector.on('collect', m => {
                if(m.content == 'yes' || m.content == 'y'){
                    db.delete(`${message.guild.id}.aq`)
                    return message.channel.send('Ok deleted it.')
                } else if(m.content == 'no' || m.content == 'n'){
                    return message.channel.send("action cancelled.")
                } else {
                    return message.channel.send("Not sure what you meant with that one just gonna cancel it.")
                }
            });

            collector.on('end', collected => {
                let ew = (collected.size)
                if(ew == 0){
                    return message.channel.send("Time ran out.")
                }
            });
        } else{
        let role = message.guild.roles.fetch(args)

        if(await role){
            //console.log(db.all())
            if (!Array.isArray(db.get(`${message.guild.id}.aq`))) db.set(`${message.guild.id}.aq`, [])
            //console.log(args)
            message.channel.send(`Set ${await role} autoquote`)
            db.push(`${message.guild.id}.aq`, args)
            //console.log('------------------')   
            // console.log(await db.get(`${message.guild.id}.aq`))
            //console.log('------------------------')
        } else {
            message.channel.send('Role not found, try help autoquote')
        }
        }

        


    }
}