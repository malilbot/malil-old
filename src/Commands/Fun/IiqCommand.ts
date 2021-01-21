import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import * as db from 'quick.db'


export default class IqCommand extends Command {
    public constructor() {
        super("iq", {
            aliases: ["iq", "smart"],
            category: "Fun",
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                }
            ],
            description: {
                content: "Find your iq",
                usage: "iq",
                example: [
                    "iq"
                ]
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message, {member}) {
            let iq;
    if(db.fetch(`${member.id}_iq`)) {
        iq = db.fetch(`${member.id}_iq`)
    } else {
        iq = Math.floor(Math.random() * 150) + 1; 
        db.set(`${member.id}_iq`, iq)
    }
        const iEmbed = new MessageEmbed()
        .setColor('#8E44AD')    
        .setTitle("IQ Test")
        .setDescription(`${member}'s IQ is: \`${iq}\`!`)
        message.channel.send(iEmbed)
}
}