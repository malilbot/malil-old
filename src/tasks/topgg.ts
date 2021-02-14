import * as Topgg from "@top-gg/sdk";
module.exports = {
    name: 'topgg',
    delay: "30m",
    execute(client) {
        if (client.user.id == "800389986042118175") return;

        const api = new Topgg.Api(client.setting.topgg);

        api.postStats({
            serverCount: client.guilds.cache.size + 5,
            shardCount: client.options.shardCount
        });

    },
};
