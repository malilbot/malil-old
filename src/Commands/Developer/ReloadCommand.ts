import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class ReloadCommand extends Command {
    public constructor() {
        super("reload", {
            aliases: ["reload"],
            category: "Core",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                }
            ],
            description: {
                content: "",
                usage: "reload",
                example: [
                    "reload"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            ownerOnly: true,
        });
    }

    public async exec(message: Message, { args }) {
        message.reply("Reloading :robot:")
        const str1 = 'this.client.commandHandler.reloadAll()'
        const str2 = 'this.client.inhibitorHandler.reloadAll()'
        const str3 = 'this.client.listenerHandler.reloadAll()'
        eval(str1)
        eval(str2)
        eval(str3)
    }
}