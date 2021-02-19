import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageFlags } from "discord.js";
import { MessageEmbed } from "discord.js";
import { CreateGist } from '../../lib/Utils'

export default class RawTagCommand extends Command {
    public constructor() {
        super("rawtag", {
            aliases: ["rawtag", "raw"],
            category: "Developer",
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
        const raw = await this.client.tags.get(message.guild.id, args)
        if (!raw) return message.channel.send("tag not found")
        const embed = new MessageEmbed()
            .setTitle("Raw tag data")
            .setDescription(await CreateGist(args, raw, this.client))
        message.channel.send(embed)
        // await message.channel.send(await gist(args, raw))

    }
}