
import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';

export default class WelcomeEmbed extends Listener {
    client: Client
    public constructor(client: Client) {
        super("welcomeEmbed", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
        // something will come here just wait for it
    }
}