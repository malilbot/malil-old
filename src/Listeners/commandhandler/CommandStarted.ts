import { Listener } from 'discord-akairo';
import { main, sec, third, fourth, a1, split, sleep, fixspace } from "../../lib/Utils"
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
        this.client.gp.math("commands", "+", 1);
        this.client.logger.info(a1("[ COMMAND RAN ] ") + main(fixspace(command, 7)) + a1(" [ USER ] ") + sec(message.author.tag) + " " + sec(message.author.id) + a1(" [ GUILD ] ") + third(message.guild.name) + " " + third(message.guild.id))
    }
}