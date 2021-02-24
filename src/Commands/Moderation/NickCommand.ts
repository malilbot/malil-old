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
            clientPermissions: ['MANAGE_NICKNAMES'],
            userPermissions: ['MANAGE_NICKNAMES'],
            ratelimit: 3,
            channel: "guild",
        });
    }

    public async exec(message, { name }) {

        const user = await GetUser(message, this.client)
        if (!user) return message.reply("user not found")
        try {
            await user.setNickname(name)
            message.reply("NickName Changed")
        } catch (err) { message.reply("Sorry cant do") }





    }
}