import { Listener } from 'discord-akairo';

import Client from '../../client/Client';


export default class CommandStarted extends Listener {
    client: Client
    public constructor(client: Client) {
        super("commandStarted", {
            emitter: "commandHandler",
            event: "commandStarted",
            category: "commandHandler"
        });
        this.client = client
    }

    exec(message, command) {
    this.client.logger.info('[COMMAND USED]: ' + message.author.tag + " " + command)
        }
}