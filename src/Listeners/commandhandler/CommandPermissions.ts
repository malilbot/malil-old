import { Listener } from "discord-akairo";
import { MessageEmbed } from "discord.js"
import Client from "../../lib/Client";
export default class missingPermissions extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("missingPermissions", {
            emitter: "commandHandler",
            event: "missingPermissions",
            category: "commandHandler"
        });
        this.client = client;
    }

    exec(message, command, type, missing) {
        if (missing.includes("SEND_MESSAGES")) return
        const perm = missing[0].toLowerCase().replace(/_/g, " ")
        if (type == "user") {
            message.util.send(`You dont have the **${perm}** permission to execute this command`)
        } else {
            message.util.send(`i dont have the **${perm}** permission to execute this command`)
        }

    }

}
