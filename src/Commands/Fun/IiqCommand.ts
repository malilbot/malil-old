import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";



export default class IqCommand extends Command {
    public constructor() {
        super("iq", {
            aliases: ["iq"],
            category: "Fun",
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

    public async exec(message: Message) {
    let target = message.mentions.members.first() || message.author
        
        const iq = Math.floor(Math.random() * 150) + 1; 
        const iEmbed = new MessageEmbed()
        .setColor('#8E44AD')    
        .setTitle("IQ Test")
        .setDescription(`${target}'s IQ is: \`${iq}\`!`)
        message.channel.send(iEmbed)
}
}