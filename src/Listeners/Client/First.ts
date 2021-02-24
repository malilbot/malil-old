import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';
import { main, sec, third, fourth, a1, split, sleep } from "../../lib/Utils"
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
            await this.client.blacklist.ensure("blacklist", [], "leavelist")
            await this.client.releases.ensure("all", []);
            await this.client.gp.ensure("commands", 0)
            await sleep("2000")
            await this.client.logger.info(main("[ LOADING DB FIRST TIME ]"))
            await this.client.logger.info(sec("[ DATABASE LOADED ]"))
            await this.client.logger.info(sec("[ PLEASE RESTART THE BOT ]"))
            await this.client.logger.info(sec("[ TO MAKE SURE EVERYTHING WENT THROUGH ]"))
            this.client.logger.info(third("[ REPO: https://github.com/SkyBlockDev/malil-akairo ]"))
            this.client.logger.info(third("[ DISCORD: https://discord.gg/mY8zTARu4g ]"))
            this.client.logger.info(third("[ WEBSITE:  https://tricked-dev.gitbook.io/malil/ ]"))
        }
    }
}