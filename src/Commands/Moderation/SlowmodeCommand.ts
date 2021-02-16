import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import ms from 'ms';
export default class SlowmodeCommand extends Command {
    public constructor() {
        super("slowmode", {
            aliases: ["slowmode", "sm"],
            category: "Moderation",
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
                usage: "slowmode",
                example: [
                    "slowmode"
                ]
            },
            ratelimit: 3,
            channel: "guild",
        });
    }

    public async exec(message, { args }) {
        if (!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send(`Sorry i cant set the slowmode of this channel im missing the \`MANAGE_CHANNELS\` permission`);
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You need the permission manage channels to execute this command")
        const Embed = new MessageEmbed()
            .setColor(this.client.setting.colors.purple)
            .setTimestamp()

        if (args == 'none' || args == 'off') {
            Embed.setAuthor("Slowmode has been turned off")
            message.channel.setRateLimitPerUser(0)
        } else {
            let time = 0
            if (ms(args) > 21600001) {
                time = 21600000
                Embed.setFooter("Cant go above 6 hours per message")
            } else {
                time = ms(args)
            }
            if (!time) return message.reply("Invalid syntax please use slowmode 1m || slowmode off")
            message.channel.setRateLimitPerUser(time / 1000)
            const longtime = ms(ms(args), { long: true })

            Embed.setAuthor(
                `slowmode has been set to ${longtime} per message`
            );

        }

        return message.reply(Embed)

    }
}