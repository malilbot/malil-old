import * as Topgg from "@top-gg/sdk";
module.exports = {
    name: 'topgg',
    delay: "30m",
    execute(client) {
        if (client.user.id !== "749020331187896410") return;
        try {
            const api = new Topgg.Api(client.setting.topgg);

            api.postStats({
                serverCount: client.guilds.cache.size + 1,
                shardCount: client.options.shardCount
            });
        } catch (e) { return }


    },
};
