import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';
import * as db from 'quick.db'

export default class messageDelete extends Listener {
    client: Client
    public constructor(client: Client) {
        super("messageDelete", {
            emitter: "client",
            event: "messageDelete",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
        db.set(`snipe.${message.guild.id}.${message.channel.id}.content`, message.content)
        db.set(`snipe.${message.guild.id}.${message.channel.id}.author`, message.author.tag)

    }
}