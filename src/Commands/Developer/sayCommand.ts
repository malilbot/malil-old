 import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class SayCommand extends Command {
    public constructor() {
        super("say", {
            aliases: ["say", "sudo", "tell"],
            category: "Developer",
            description: {
                content: "Make force the bot to say stuff",
                usage: "say",
                example: [
                    "say pog"
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
        message.delete()
        message.channel.send(code)
    }
}
