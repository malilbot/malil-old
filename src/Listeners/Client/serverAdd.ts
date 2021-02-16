
import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js'
import Client from '../../client/Client';

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
        this.client.logger.info("New guild: " + guild.name)
    }
}