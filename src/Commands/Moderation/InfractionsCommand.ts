import { Command } from "discord-akairo";
import { GetUser } from "../../lib/Utils"
import { MessageEmbed, Message, GuildChannel, TextChannel, GuildMember } from "discord.js";
import fetch from "node-fetch";
export default class InfractionsCommand extends Command {
    public constructor() {
        super("infractions", {
            aliases: ["infractions", "warns", "warnings"],
            category: "Moderation",
            quoted: true,
            description: {
                content: "",
                usage: "infractions",
                example: [
                    "infractions"
                ]
            },
            userPermissions: ['MANAGE_MESSAGES'],
            ratelimit: 3,
            channel: "guild"
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async exec(message: Message) {


        const user = await GetUser(message, this.client)
        if (!user) return message.reply("user not found")
        const usID = user.id
        this.client.infractions.ensure(message.guild.id, { [usID]: {} })
        const infractions = this.client.infractions.get(message.guild.id, usID)
        let mesg = ''
        Object.keys(infractions).forEach(key => {
            mesg += "**Reason:** " + infractions[key].reason + "\n**Type:** "
            mesg += infractions[key].type + "\n**Mod:** "
            mesg += infractions[key].who + "\n"
            mesg += "----------------------------\n"
        });
        if (mesg.length < 6) {
            return message.util.send("user doesnt have any infractions")
        }
        const embed = new MessageEmbed()
            .setColor(this.client.setting.colors.default)
        if (mesg.length > 1024) {
            const data = await fetch("https://hst.skyblockdev.repl.co/documents", {
                method: "post",
                body: mesg
            })
                .then((response) => response.json())
                .catch((e) => { message.reply(e) })
            embed.addField("warns of " + user, "https://hst.skyblockdev.repl.co/" + data.key)
        } else embed.addField("warns of " + user, mesg)


        message.reply(embed)

    }
}
