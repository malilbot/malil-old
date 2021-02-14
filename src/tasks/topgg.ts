// might be at some point
import Client from "../client/Client";
import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";
import * as Topgg from "@top-gg/sdk";
module.exports = {
    name: 'topgg',
    delay: "1m",
    execute(client) {
        console.log("pog topgg worked")
        if (client.user.id == "800389986042118175") return;

        const api = new Topgg.Api(client.setting.topgg);

        api.postStats({
            serverCount: client.guilds.cache.size + 5,
            shardCount: client.options.shardCount
        });

    },
};
