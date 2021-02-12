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
    console.log(message.author.id)
    }
}