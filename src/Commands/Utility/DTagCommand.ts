import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class DTagCommand extends Command {
    public constructor() {
        super("dtag", {
            aliases: ["dtag"],
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
                content: "Run a tag and delete the original website",
                usage: "dtag",
                example: [
                    "dtag"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        message.delete().catch(e => message.channel.send("sorry something went wrong: " + e))
        if(!this.client.tags.get(message.guild.id, args)) message.channel.send("Sorry couldnt find that tag")
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(args)
        .setDescription(this.client.tags.get(message.guild.id, args))

    }
}