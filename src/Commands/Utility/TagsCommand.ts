import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class TagsCommand extends Command {
    public constructor() {
        super("tags", {
            aliases: ["tags"],
            category: "Utility",
            quoted: true,
            description: {
                content: "",
                usage: "tags",
                example: [
                    "tags"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message ) {
        let tags = this.client.tags.get(message.guild.id)
        
        tags = Object.keys(tags).toString().replace(/(\r\n|\n|\r|,)/gm, ", ");
        console.log(tags)   
    
    const Embed = new MessageEmbed() 
    .setTitle(`tags in ${message.guild}`)
    .setDescription(tags) 
    .setColor('#FF0000')
    message.reply(Embed);

    }
}