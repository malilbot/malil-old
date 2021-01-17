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
    this.client.logger.info(`\x1b[33m[COMMAND USED]\x1b[0m\x1b[32m: ${message.author.tag} \x1b[33m[GUILD]\x1b[0m\x1b[32m: ${message.guild.name} \x1b[33m[COMMAND]\x1b[0m\x1b[32m: ${command}`)
    this.client.logger.info(`\x1b[33m[COMMAND USED]\x1b[0m\x1b[32m: author id = '${message.author.id}' msg id =  '${message.id}' channel id = '${message.channel.id} guild id = '${message.guild.id}'`)
        }                                                                                                                                                                                                                           
}                                                                                                                                                                                                                                   