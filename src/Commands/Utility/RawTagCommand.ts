import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageFlags } from "discord.js";
import { MessageEmbed } from "discord.js";
import { gist } from '../../Utils/Utils'

export default class RawTagCommand extends Command {
    public constructor() {
        super("rawtag", {
            aliases: ["rawtag", "raw"],
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
                usage: "rawtag",
                example: [
                    "rawtag"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        await this.client.tags.ensure(message.guild.id, {});
        let raw = await this.client.tags.get(message.guild.id, args)
        if(!raw) return message.channel.send("tag not found")
        let embed = new MessageEmbed()
        .setTitle("Raw tag data")
        .setDescription(await gist(args, raw))
        message.channel.send(embed)
        // await message.channel.send(await gist(args, raw))

    }
}