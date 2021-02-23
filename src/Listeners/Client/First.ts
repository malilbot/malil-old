import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';

export default class First extends Listener {
    client: Client
    public constructor(client: Client) {
        super("first", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
        if (
            !this.client.blacklist.get("blacklist") ||
            !this.client.blacklist.get('blacklisted') ||
            !this.client.blacklist.get('blacklisted', 'guilds') ||
            !this.client.blacklist.get('blacklisted', 'list') ||
            !this.client.gp.get("superUsers") ||
            !this.client.blacklist.get("blacklist", "leavelist") ||
            !this.client.releases.get("all")
            //!this.client.gp.get("commands")
        ) {

            await this.client.blacklist.ensure('blacklisted', [], 'guilds')
            await this.client.blacklist.ensure('blacklisted', [], 'list')
            await this.client.gp.ensure("superUsers", [])
            await this.client.logger.info("[ LOADING DB FIRST TIME ]")
            await this.client.blacklist.ensure("blacklist", [], "leavelist")
            await this.client.releases.ensure("all", []);
            await this.client.gp.ensure("commands", 0)
            await this.client.logger.info("[ DATABASE LOADED ]")
            await this.client.logger.info("[ PLEASE RESTART THE BOT ]")
            await this.client.logger.info("[ TO MAKE SURE EVERYTHING WENT THROUGH ]")
            this.client.logger.info("[ REPO: https://github.com/SkyBlockDev/malil-akairo ]")
            this.client.logger.info("[ DISCORD: https://discord.gg/mY8zTARu4g ]")
            this.client.logger.info("[ WEBSITE:  https://tricked-dev.gitbook.io/malil/ ]")
        }
    }
}