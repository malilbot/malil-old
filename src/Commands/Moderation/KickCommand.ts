import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetUser, GetSelf } from "../../lib/Utils"

export default class KickCommand extends Command {
    public constructor() {
        super("kick", {
            aliases: ["kick"],
            category: "Moderation",
            description: {
                content: "To kick member on this guild",
                usage: "kick < member > ",
                example: [
                    "kick @member"
                ]
            },
            ratelimit: 3,
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            channel: "guild",
            args: [

                {
                    id: "reason",
                    type: "string",
                    default: "No reason provided...."
                }
            ]

        });
    }

    public async exec(message: Message, { reason }: { user: GuildMember; reason: string }) {

        let user = await GetUser(message, this.client)
        user = (user as GuildMember)
        if (!user) return message.reply("user not found")
        if (!user.kickable) return message.channel.send(`Sorry, i can't kick this user`);

        if (!message.member.guild.me.permissions.has(["KICK_MEMBERS"])) return message.channel.send(`Sorry, i don't have permission to kick members, make sure you give me \`KICK_MEMBERS\` permission`);
        reason = reason.replace(user.id, "").replace(/<.*?>/g, "")
        user.kick().then(x => {
            x.send(`You has been kicked from **${message.guild.name}** for reason \`${reason}\``);
            message.util.send(
                new MessageEmbed()
                    .setAuthor(`User kicked by ${message.author.tag}`, message.author.avatarURL())
                    .setDescription(`
                Name: ${x.user.tag}
                Time Kicked: ${utc(Date.now())}
                Reason: ${reason}`)
                    .setFooter(`Sayonara~`)
                    .setTimestamp()
            );
        });

        const usID = (user as GuildMember).id
        //* ------------------------------------ infraction code */
        this.client.infractions.ensure(message.guild.id, { [usID]: {} })
        const infraction = this.client.infractions.get(message.guild.id, usID)
        const riw = {
            "who": message.author.tag,
            "reason": reason,
            "type": "warn"
        }
        infraction[Date.now()] = riw
        this.client.infractions.set(message.guild.id, infraction, usID)

        if (this.client.logchannel.get(message.guild.id)) {
            if ((await this.client.channels.fetch(this.client.logchannel.get(message.guild.id)) as GuildChannel).deleted == false) {
                const embed = new MessageEmbed()
                    .setAuthor(`User kicked by ${message.author.tag}`, message.author.avatarURL())
                    .setDescription(`Member: ${user.user.tag}\nReason ${reason}`)
                    .setColor(this.client.setting.colors.red)
                    .setTimestamp();
                (await this.client.channels.fetch(this.client.logchannel.get(message.guild.id)) as TextChannel).send(embed)
            }
        }
    }
}
