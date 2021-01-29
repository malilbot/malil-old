import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class TagCommand extends Command {
    public constructor() {
        super("tag", {
            aliases: ["tag"],
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
                usage: "tag",
                example: [
                    "tag"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        await this.client.tags.ensure(message.guild.id, {});
        if(!this.client.tags.get(message.guild.id, args)) message.channel.send("Sorry couldnt find that tag")
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(args)
        .setDescription(this.client.tags.get(message.guild.id, args))
        message.reply(embed)

    }
}