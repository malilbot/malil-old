import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";



export default class EightballCommand extends Command {
    public constructor() {
        super("eightball", {
            aliases: ["eightball", "8ball"],
            category: "Core",
            quoted: false,
            args: [
				{
					id: 'args',
					match: 'content'
				}
			],
            description: {
                content: "Find your 8ball",
                usage: "eightball",
                example: [
                    "eightball"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        if (!args[0]) return message.reply({embed: {
        color: `#FF0000`,
        description: `Please ask a question!`
        }
    });

    let replies = ["Yes.", "No.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.","Hey, i dont make the decisions", "NO!", "Never.", "Nope.", "Scientifically yes."];
    
    let result = Math.floor((Math.random() * replies.length));
    
    let question = args

    let wisdom = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor(`RANDOM`)
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setFooter(`8ball`);
    message.channel.send(wisdom)
    }
}