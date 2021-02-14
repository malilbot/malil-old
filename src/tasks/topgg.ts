// might be at some point
import Client from "../client/Client";
import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";
import * as Topgg from "@top-gg/sdk";
module.exports = {
    name: 'topgg',
    delay: "30m",
    execute() {
        console.log("pog topgg worked")
        if (this.client.user.id == "800389986042118175") return;

        const api = new Topgg.Api(this.client.setting.topgg);

        api.postStats({
            serverCount: this.client.guilds.cache.size + 5,
            shardCount: this.client.options.shardCount
        });

    },
};
