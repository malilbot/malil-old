import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
export default class extends Inhibitor {
    constructor() {
        super('GuildBlacklist', {
            reason: 'blacklist',
            type: 'all',
        });
    }

    exec(message: Message) {
        this.client.blacklist.ensure('blacklisted', [], 'guilds')
        if (message.guild.id) return (this.client.blacklist.get('blacklisted', 'guilds').includes(message.guild.id))

    }
}