import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';

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
        if (message.author.bot) return;
        if (message.guild !== null) return;
        this.client.logger.info(`\x1b[35m[DM]\x1b[32m[AUTHOR]\x1b[34m ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`)
    }
}