import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import moment from 'moment'

export default class testCommand extends Command {
    public constructor() {
        super("test", {
            aliases: ["test"],
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
                usage: "test",
                example: [
                    "test"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            ownerOnly: true,
        });
    }

    public async exec(message: Message, { args }) {
        // await message.guild.members.fetch()
        let yes = ''
        let members = await Promise.all(message.guild.members.cache.map((member) => member.fetch()));
        members.forEach(member => yes += moment(member.joinedAt).format('LL LTS') + ' - ' + member.user.tag + '\n')
        message.channel.send(yes)


    }
}

