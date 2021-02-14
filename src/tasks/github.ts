// might be at some point
import { Listener } from "discord-akairo";
import Client from "../client/Client";
import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";

module.exports = {
    name: 'github',
    delay: "30m",
    async execute() {
        console.log("pog github worked")

        const headers = {
            "Content-Authorization": `token ${this.client.setting.gist}`
        };
        let repos = this.client.releases.get("all");
        for (var i = 0; i < repos.length; i++) {
            /* ----------------------- */
            let split = repos[i].split("|");
            const data = await fetch(`https://api.github.com/repos/${split[0]}/releases`, {
                headers: headers
            })
                .then((response) => response.json())
                .catch((e) => { });
            if (data.documentation_url) {
                console.log("api rate limited");
                console.log(split);
            } else {
                if (!data.tag_name) {

                } else if (split[1] == data.tag_name) {

                } else {
                    console.log("good compare");
                    /* ----------------------- */
                    for (var l = 0; l < repos.length; l++) {
                        if (repos[l] == repos[i]) {
                            repos.splice(l, 1);
                        }
                    }

                    /* ----------------------- */

                    this.client.releases.set("all", repos);
                    this.client.releases.push("all", split[0] + "|" + data[0].tag_name);

                    let url = data[0].html_url.split("/");

                    let servers = this.client.releases.keyArray();
                    const fetchs = await fetch(data[0].url, {
                        headers: headers
                    })
                        .then((response) => response.json())
                        .catch((e) => { });
                    /* ----------------------- */
                    SendMessage(servers, split, this.client, url, data, fetchs);

                    /* ----------------------- */
                }
            }
        }

        async function SendMessage(servers, split, client, url, data, fetchs) {
            for (var i = 0; i < servers.length; i++) {
                /* ----------------------- */
                let body = fetchs.body;
                if (servers[i] == "all") return;
                let bodylength = body.length;

                if (!body) body = "no description";
                if (bodylength > 1024) {
                    function cutString(s, n) {
                        /* ----------------------- */
                        var cut = s.indexOf(" ", n);
                        if (cut == -1) return s;
                        return s.substring(0, cut);
                    }
                    /* ----------------------- */
                    body = cutString(body, 400);
                    body += "....";
                }
                if (!client.releases.get(servers[i], "repos").includes(split[0])) {
                } else {
                    let id = client.releases.get(servers[i], "channel");
                    let channel = await client.channels.fetch(id).catch((e) => { });
                    if (!channel) {
                    } else {
                        const embed = new MessageEmbed()
                            .setDescription(data[0].html_url)
                            .setTitle("new release from:  " + data[0].author.login)
                            .addField(url[4] + " " + data[0].tag_name, body);

                        await (channel as TextChannel).send(embed).catch((e) => { });
                    }
                }

                /* ----------------------- */
            }
        }

        async function compare(split, data) {
            /* ----------------------- */
            const thing = data[0].tag_name;
            if (
                !thing ||
                !data[0] ||
                !data[0].tag_name ||
                data[0].tag_name == undefined ||
                data[0].tag_name == null ||
                split[1] == data[0].tag_name
            )
                return true;
            else return false;
            /* ----------------------- */
        }
    },
};
