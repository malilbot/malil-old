import { Listener } from "discord-akairo";

import type Client from "../../client/Client";

export default class Raw extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("raw", {
            emitter: "client",
            event: "raw",
            category: "client"
        });
        this.client = client;
    }

    public exec(d) {
    }
}
