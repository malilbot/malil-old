import { superUsers } from "@root/config";
import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { GetUser, GetSelf } from "../../lib/Utils"
export default class SuperUserCommand extends Command {
    public constructor() {
        super("superUser", {
            aliases: [
                "sudo",
                "su",
                "superUsers"
            ],
            category: "Developer",
            quoted: true,
            args: [
                {
                    id: 'add',
                    type: 'boolean',
                    match: 'flag',
                    flag: ["-a", "--add"],
                },
                {
                    id: 'remove',
                    type: 'boolean',
                    match: 'flag',
                    flag: ["-r", "--remove"],
                }
            ],
            description: {
                content: "Superuser's a user",
                usage: "su",
                example: [
                    "su"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            ownerOnly: true
        });
    }

    public async exec(message: Message, { remove, add }) {

        this.client.gp.ensure("superUsers", []);
        const list = this.client.gp.get("superUsers");
        const id = await GetUser(message, this.client)
        if (add == true) {
            this.client.gp.push("superUsers", id.id);
        } else if (remove == true) {
            const sulist = this.client.gp.get("superUsers");
            for (let i = 0; i < sulist.length; i++) {
                if (sulist[i] == id) {
                    sulist.splice(i, 1);
                }
                this.client.gp.set("superUsers", sulist)
            }

        }
        const embed = new MessageEmbed()
            .setDescription(id.tag + " is now a super user")
            .addField("old", list || "Empty")
            .addField("new", this.client.gp.get("superUsers") || "Empty")
        message.util.send(embed)


    }
}
