import centra from "centra"
import { Client } from "discord.js"
export default class BotLists {
    client: Client;
    topgg: string;
    discordbotlist: string
    bladebotlist: string
    discordextremelist: string
    botsgg: string
    verbose: boolean

    constructor(client: Client, {
        topgg,
        discordbotlist,
        bladebotlist,
        discordextremelist,
        botsgg,
        verbose = false
    }) {
        this.verbose = verbose
        this.client = client
        this.topgg = topgg
        this.discordbotlist = discordbotlist
        this.bladebotlist = bladebotlist
        this.discordextremelist = discordextremelist
        this.botsgg = botsgg
    }
    async post() {
        if (this.verbose == true) console.log("[ POSTING TO BOT SITES ]")

        const topgg = {
            "server_count": this.client.guilds.cache.size,
            "shard_count": this.client.shard.ids.length,
            "shard_id": this.client.shard.ids[0]
        }
        try {
            await (await centra(`https://top.gg/api//bots/${this.client.user.id}/stats`, "post")
                .header("Authorization", this.topgg)
                .body(topgg)
                .send()).json();
        } catch (err) { console.warn("[ COULD NOT POST TO TOPGG ]") }


        const discordbotlist = {
            "guilds": this.client.guilds.cache.size,
            "users": this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
            "shard_id": this.client.shard.ids[0]
        }
        try {
            await (await centra(`https://discordbotlist.com/api/v1/bots/${this.client.user.id}/stats`, "post")
                .header("Authorization", this.discordbotlist)
                .body(discordbotlist)
                .send()).json();

        } catch (err) { console.warn("[ COULD NOT POST TO discordbotlist ]") }


        const bladebotlist = {
            "server_count": this.client.guilds.cache.size,
            "shardcount": this.client.shard.ids.length
        }
        try {
            await (await centra(`https://bladebotlist.xyz/api/bots/${this.client.user.id}/stats`, "post")
                .header("Authorization", this.bladebotlist)
                .body(bladebotlist)
                .send()).json();
        } catch (err) { console.warn("[ COULD NOT POST TO bladebotlist ]") }



        const discordextremelist = {
            "guildCount": this.client.guilds.cache.size,
            "shardcount": this.client.shard.ids.length
        }
        try {
            await (await centra(`https://api.discordextremelist.xyz/v2/bot/${this.client.user.id}/stats`, "post")
                .header("Authorization", this.discordextremelist)
                .body(discordextremelist)
                .send()).json();
        } catch (err) { console.warn("[ COULD NOT POST TO discordextremelist ]") }

        const botsgg = {
            "guildCount": this.client.guilds.cache.size,
            "shardCount": this.client.shard.ids.length,
            "shardId": this.client.shard.ids[0]
        }

        try {
            await (await centra(`https://discord.bots.gg/api/v1/bots/${this.client.user.id}/stats`, "post")
                .header("Authorization", this.botsgg)
                .body(botsgg)
                .send()).json();
        } catch (err) { console.warn("[ COULD NOT POST TO discord.bots.gg ]") }
    }
}