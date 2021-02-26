import centra from "centra"
module.exports = {
    name: 'randomlists',
    delay: "12h",
    async execute(client) {
        if (client.user.id !== "749020331187896410") return;

        const topgg = {
            "server_count": client.guilds.cache.size,
            "shard_count": client.shard.ids.length,
            "shard_id": client.shard.ids[0]
        }
        await (await centra("https://top.gg/api//bots/749020331187896410/stats", "post")
            .header("Authorization", client.setting.bottokens.topgg)
            .body(topgg)
            .send()).json();

        const discordbotlist = {
            "guilds": client.guilds.cache.size,
            "users": client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
            "shard_id": client.shard.ids[0]
        }
        await (await centra("https://discordbotlist.com/api/v1/bots/749020331187896410/stats", "post")
            .header("Authorization", client.setting.bottokens.discordbotlist)
            .body(discordbotlist)
            .send()).json();


        const bladebotlist = {
            "server_count": client.guilds.cache.size,
            "shardcount": client.shard.ids.length
        }
        await (await centra("https://bladebotlist.xyz/api/bots/749020331187896410/stats", "post")
            .header("Authorization", client.setting.bottokens.Bladebnots)
            .body(bladebotlist)
            .send()).json();


        const discordextremelist = {
            "guildCount": client.guilds.cache.size,
            "shardcount": client.shard.ids.length
        }
        await (await centra("https://api.discordextremelist.xyz/v2/bot/749020331187896410/stats", "post")
            .header("Authorization", client.setting.bottokens.discordextreme)
            .body(discordextremelist)
            .send()).json();

    },
};
