
import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js'
import Client from '../../lib/Client';
import { main, sec, third, fourth, a1, split, sleep } from "../../lib/Utils"
export default class guildCreate extends Listener {
    client: Client
    public constructor(client: Client) {
        super("guildCreate", {
            emitter: "client",
            event: "guildCreate",
            category: "client"
        });
        this.client = client
    }

    async exec(guild: Guild) {
        if (this.client.blacklist.get("blacklist", "leavelist").includes(guild.id)) return guild.leave()
        this.client.logger.info(`${sec("[SERVER ADD]")} ${main(guild.name)}`)
    }
}