import { Listener } from "discord-akairo";
import { MessageEmbed } from "discord.js"
import Client from "../../client/Client";
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

    exec(message, command, type) {
        // console.log(type)
        if (type == "user") {
            const perm = command.userPermissions[0].toLowerCase().replace(/_/g, " ")
            message.util.send(`You dont have the **${perm}** permission to execute this command`)
        } else {
            const perm = command.clientPermissions[0].toLowerCase().replace(/_/g, " ")
            message.util.send(`i dont have the **${perm}** permission to execute this command`)
        }
        // console.log(type)

    }

}
