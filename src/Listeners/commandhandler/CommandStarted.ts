import { Listener } from 'discord-akairo';
import { main, sec, third, fourth, a1, split, sleep } from "../../lib/Utils"
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
        this.client.gp.math("commands", "+", 1)
        this.client.logger.info(a1("[ COMMAND RAN ] ") + main(command) + a1(" [ USER ] ") + sec(message.author.tag) + " " + sec(message.author.id) + a1(" [ GUILD ] ") + third(message.guild.name) + third(message.guild.id))
        // this.client.logger.info(`\x1b[32mCommand Used \x1b[33m- \x1b[32m${message.author.tag} (${message.author.id}) \x1b[33m- \x1b[32m${message.guild} (${message.guild.id}) \x1b[33m- \x1b[32m${command} \x1b[33m- \x1b[32m${message.id}`)
        // this.client.logger.info(`\x1b[33m Command Used -\x1b[0m\x1b[32m: ${message.author.tag} \x1b[33m[GUILD]\x1b[0m\x1b[32m: ${message.guild.name} \x1b[33m[COMMAND]\x1b[0m\x1b[32m: ${command}`)
        // this.client.logger.info(`\x1b[33m Command Used -\x1b[0m\x1b[32m: author id = '${message.author.id}' msg id =  '${message.id}' channel id = '${message.channel.id} guild id = '${message.guild.id}'`)
    }
}