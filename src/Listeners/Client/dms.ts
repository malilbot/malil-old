import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../lib/Client';
import {
    main,
    sec,
    third,
    fourth,
    a1,
    split
} from "../../lib/Utils"
export default class message extends Listener {
    client: Client
    public constructor(client: Client) {
        super("message", {
            emitter: "client",
            event: "message",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
        if (message.content.includes("malil")) {
            this.client.logger.info(`${main("[MALIL MENTIONED]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`)
        }
        if (message.content.includes("tricked")) {
            this.client.logger.info(`${main("[MALIL MENTIONED]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`)
        }
        if (message.author.bot) return;
        if (message.guild !== null) return;
        this.client.logger.info(`${main("[DM]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`)
    }
}