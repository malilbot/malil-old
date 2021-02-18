/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { join } from 'path';
import ms from "ms"
import { readdirSync } from "fs"

export default class TaskHandler {
    directory: string
    client: any;

    constructor(client, {
        directory,
    }) {
        this.client = client
        this.directory = directory;
    }
    loadall() {
        const taskfiles = readdirSync(join(__dirname, "..", "Tasks")).filter(file => file.endsWith('.js'));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const file of taskfiles) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const task = require(join(__dirname, "..", "Tasks/" + file));
            if (task.awaitReady == true) {
                this.client.on("ready", ready => {
                    if (task.runOnStart == true) task.execute(this.client)
                })
            } else if (task.runOnStart == true) task.execute(this.client)


            setInterval(() => {
                task.execute(this.client);
            }, (ms(task.delay)));
        }

    }

}
