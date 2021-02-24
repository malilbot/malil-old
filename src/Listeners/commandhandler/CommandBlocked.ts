import { Listener } from "discord-akairo";

import Client from "../../client/Client";
export default class commandBlocked extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("commandBlocked", {
            emitter: "commandHandler",
            event: "commandBlocked",
            category: "commandHandler"
        });
        this.client = client;
    }

    exec(message, command, reason) {
        if (reason == "owner") {
            message.react("812398880515817472")
        }
    }

}
