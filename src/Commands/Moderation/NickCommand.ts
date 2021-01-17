import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class NickCommand extends Command {
    public constructor() {
        super("nick", {
            aliases: ["nick"],
            category: "Moderation",
            quoted: true,
            args: [
                 {
                    id: "user",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please tag some users`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please tag some users`
                    },
                    match: "rest"
                },
                {
                    id: "name",
                    type: "string",
                    default: "No reason provided...."
                }
            ],
            description: {
                content: "Change a nickname",
                usage: "nick",
                example: [
                    "nick"
                ]
            },
            ratelimit: 3,
            channel: "guild",
        });
    }

    public async exec(message, { user, name }) {
        if(!message.member.guild.me.hasPermission(["MANAGE_NICKNAMES"])) return message.channel.send(`Sorry, i don't have permission to change nickanmes of members, make sure you give me \`MANAGE_NICKNAMES\` permission`);
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("You need the permission manage nicknames to execute this command")
        if(message.mentions.members.first().roles.highest.position > message.guild.members.resolve(this.client.user).roles.highest.position) return message.channel.send("Sorry i cant change the nickname of that use cause his highest role is higher than mine");
        message.reply("NickName Changed")
        user.setNickname(name)


    }
}