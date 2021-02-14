import { Listener } from "discord-akairo";
import { Collection } from "discord.js";
import Client from "../../client/Client";
import { join } from 'path';
import ms from "ms"
import { readdirSync } from "fs"

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
        const taskfiles = readdirSync(join(__dirname, "..", "..", "tasks")).filter(file => file.endsWith('.js'));
        for (const file of taskfiles) {
            const task = require(join(__dirname, "..", "..", "tasks/" + file));
            setInterval(() => {
                task.execute(this.client);
            }, (ms(task.delay)));
        }
    }
}
