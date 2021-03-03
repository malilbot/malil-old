/* eslint-disable prefer-spread */
/* eslint-disable no-var */
import { Listener } from 'discord-akairo';
import { User } from 'discord.js';
import { Message } from 'discord.js'
import Client from '../../lib/Client';

export default class messageReactionAdd extends Listener {
    client: Client
    public constructor(client: Client) {
        super("messageReactionAdd", {
            emitter: "client",
            event: "messageReactionAdd",
            category: "client"
        });
        this.client = client
    }

    async exec(reaction, user) {
        if (reaction.message.partial) await reaction.message.fetch();

        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.id === '816074611199574027') {
            if (reaction.emoji.name === 'pogshrimp') {
                await reaction.message.guild.members.cache.get(user.id).roles.add('816073365621440513')
            }
        }
    }
}
/*



this.client.on('message', msg => {
    if (msg?.guild?.id !== "755166643927122091") return
    else if (msg.content.toLowerCase().includes('retard') && !message.author.bot) return msg.reply("Please dont use the word retard and be nice")
})
*/