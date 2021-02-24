import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';

export default class messageDelete extends Listener {
    client: Client
    public constructor(client: Client) {
        super("messageDelete", {
            emitter: "client",
            event: "messageDelete",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
    }
}