import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";

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
            channel: "guild",
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
                    id: "reason",
                    type: "string",
                    default: "No reason provided...."
                }
            ]
        });
    }

    public async exec(message: Message, { user, reason }: { user: GuildMember; reason: string }) {
        if (!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);

        if (!user.kickable) return message.channel.send(`Sorry, i can't kick this user`);

        if (!message.member.guild.me.hasPermission(["KICK_MEMBERS"])) return message.channel.send(`Sorry, i don't have permission to kick members, make sure you give me \`KICK_MEMBERS\` permission`);

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
