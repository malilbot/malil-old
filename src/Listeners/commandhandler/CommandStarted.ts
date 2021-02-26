import { Listener } from 'discord-akairo';
import { main, sec, third, fourth, a1, split, sleep, fixspace } from "../../lib/Utils"
import Client from '../../lib/Client';


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

    async exec(message, command) {
        this.client.gp.math("commands", "+", 1);
        const com = await main(await fixspace(command, 7))
        this.client.logger.info(a1("[ COMMAND RAN ] ") + com + a1(" [ USER ] ") + sec(message.author.tag) + " " + sec(message.author.id) + a1(" [ GUILD ] ") + third(message.guild.name) + " " + third(message.guild.id))
    }
}