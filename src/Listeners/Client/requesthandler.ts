import { Listener } from "discord-akairo";
import { Collection } from "discord.js";
import Client from "../../client/Client";
import { join } from 'path';
import { ms } from "ms"


export default class request extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("request", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client;
    }

    async exec() {
        // someday ill fix this stuff cba atm LOL

        /*
        const fs = require('fs');
        const tasks = new Collection()




        const taskfiles = fs.readdirSync(join(__dirname, "..", "..", "tasks")).filter(file => file.endsWith('.js'));
        for (const file of taskfiles) {
            const task = require(join(__dirname, "..", "..", "tasks/" + file));
            tasks.set(task.name + '|' + task.delay, tasks);

        }
        tasks.forEach((values, keys: string) => {
            keys.split("|")
            tasks.get(keys[0]).execute();
        })
        */

    }
}
