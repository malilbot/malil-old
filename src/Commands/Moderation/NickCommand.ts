import { Command } from "discord-akairo";
import { GetUser, GetSelf } from "../../lib/Utils"
import { MessageEmbed } from "discord.js";

export default class NickCommand extends Command {
    public constructor() {
        super("nick", {
            aliases: ["nick", "changenick"],
            category: "Moderation",
            quoted: true,
            args: [
                {
                    id: "name",
                    type: "string",
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

    public async exec(message, { name }) {
        if (!name) return message.reply("please mention a user")
        if (!message.member.guild.me.hasPermission(["MANAGE_NICKNAMES"])) return message.channel.send(`Sorry, i don't have permission to change nicknames of members, make sure you give me \`MANAGE_NICKNAMES\` permission`);
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("You need the permission manage nicknames to execute this command")
        if (message.mentions.members.first().roles.highest.position > message.guild.members.resolve(this.client.user).roles.highest.position) return message.channel.send("Sorry i cant change the nickname of that use cause his highest role is higher than mine");

        user = await GetUser(message, this.client)
        if (!user) return message.reply("user not found")
        message.reply("NickName Changed")
        user.setNickname(name)


    }
}