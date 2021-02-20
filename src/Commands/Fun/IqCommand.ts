import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import * as db from 'quick.db'
import { GetUser, GetSelf } from "../../lib/Utils"

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

    public async exec(message: Message, { }) {
        const member = await GetSelf(message, this.client) || message.member
        let iq;
        if (db.fetch(`member.${member.id}.iq`)) {
            iq = db.fetch(`member.${member.id}.iq`)
        } else {
            iq = Math.floor(Math.random() * 150) + 1;
            db.set(`member.${member.id}.iq`, iq)
        }
        const iEmbed = new MessageEmbed()
            .setColor(this.client.setting.colors.default)
            .setTitle("IQ Test")
            .setDescription(`${member}'s IQ is: \`${iq}\`!`)
        message.channel.send(iEmbed)
    }
}