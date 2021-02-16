import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";



export default class EightballCommand extends Command {
    public constructor() {
        super("eightball", {
            aliases: ["eightball", "8ball"],
            category: "Fun",
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
        if (!args[0]) return message.reply({
            embed: {
                color: `#FF0000`,
                description: `Please ask a question!`
            }
        });

        let replies = ["Yes.", "No.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.", "Hey, i dont make the decisions", "NO!", "Never.", "Nope.", "Scientifically yes."];

        let result = Math.floor((Math.random() * replies.length));

        let question = args
        if (question == 'sex penis') return message.reply(
            new MessageEmbed()
                .setAuthor(message.author.tag)
                .setColor(this.client.setting.colors.purple)
                .addField("Question", question)
                .addField("Answer", 'Cholera kurwa. Tak cholernie chcę zerżnąć psa z animal crossing. Nie mogę już tego znieść. Za każdym razem, gdy idę do ratusza, dostaję potężną erekcję. Widziałem dosłownie każdy artykuł porno z animal crossing online. Moje sny to tylko ciągły seks z Isabelle. Mam dość tego, że budzę się każdego ranka z sześcioma orzechami w moich bokserkach i wiem, że to są orzechy, które powinny zostać wbite w ciasną psią cipkę Isabelle. Chcę, żeby miała moje zmutowane ludzkie / psie dzieci. Kurwa, moja pieprzona mama złapała mnie z psem sąsiadów. Ubrałem ją w spódnicę mojej siostry i pojechałem do pieprzonego miasta. Nie odezwała się do mnie od 10 godzin i martwię się, że odbierze mi 3DS. Może już nigdy nie zobaczę Isabelle.')
                .setFooter(`8ball`))
        let wisdom = new MessageEmbed()
            .setAuthor(message.author.tag)
            .setColor(this.client.setting.colors.purple)
            .addField("Question", question)
            .addField("Answer", replies[result])
            .setFooter(`8ball`);
        message.channel.send(wisdom)
    }
}