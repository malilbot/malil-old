import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import util from 'util';
import req from "snekfetch";

export default class EvalCommand extends Command {
    public constructor() {
        super("eval", {
            aliases: ["eval", "ev"],
            category: "Developer",
            description: {
                content: "Some super javascript code",
                usage: "eval < javascript >",
                example: [
                    "eval message.guild.id"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            ownerOnly: true,
            channel: "guild"
        });
        
    }
    public async exec(message: Message, { code }) {
//
function dm(guy, message, client) { return client.users.fetch(guy).then(user => user.send(message)) }
//
//
function channel(chanid, message, client){ return client.channels.fetch(chanid).then(channel => channel.send(message)) }
//
        const evalcode = code
            if(code.includes("--silent")) code = code.replace("--silent", "")
            if(code.includes("--delete")) code = code.replace("--delete", "") && message.delete()
        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.tag}'s Evaled`)
            .setColor("RED")
            .addField("🍞 Input", `\`\`\`ts\n${code}\`\`\``)

        try {

            var evaled = await eval(code);

            const output = util.inspect(evaled, { depth: 0});
            if (output.length > 1024) {
                const { body } = await req.post("http://tk-bin.glitch.me/documents").send(output);
                embed.addField("🫓 Output", `http://tk-bin.glitch.me/${body.key}.js`);
                embed.addField("Type", typeof evaled);
            } else {
                embed.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``);
                embed.addField("Type", typeof evaled);
            }
        } catch (e) {
            const error = (e);
            if (error.length > 1024) {
                const { body } = await req.post("http://tk-bin.glitch.me/documents").send(error);
                embed.addField("🫓 Error", `http://tk-bin.glitch.me/${body.key}.js`);
                embed.addField("Type", typeof evaled);
            } else {
                embed.addField("🫓 Error", `\`\`\`ts\n${error}\`\`\``);
                embed.addField("Type", typeof evaled);
            }
        }
        if(evalcode.includes("--silent")) return message.author.send(embed)
        if(evalcode.includes("--delete")) return
        message.util.send(embed);
    }
}
