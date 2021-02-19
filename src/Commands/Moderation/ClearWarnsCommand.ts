import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { GetUser, GetSelf } from "../../lib/Utils"
export default class ClearWarnsCommand extends Command {
    public constructor() {
        super("clearwarns", {
            aliases: ["clearwarns"],
            category: "Utility",
            quoted: true,
            description: {
                content: "",
                usage: "clearwarns",
                example: [
                    "clearwarns"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message, { args }) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);


        let user = await GetUser(message, this.client)
        if (!user) message.reply("user not found")
        this.client.infractions.delete(message.guild.id, user.id)
        message.reply("infractions cleared")


    }
}
