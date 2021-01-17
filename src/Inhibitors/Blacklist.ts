import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
const config = require("../../config.json") 
const { blacklist } = config;

export default class extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist',
            type: 'all',
        });
    }
    
    exec(message: Message) {
        return config.Blacklist.includes(message.author.id);
    }
}