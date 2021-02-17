import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";

module.exports = {
    name: 'github',
    delay: "30m",
    async execute(client) {
        const headers = {
            "Content-Authorization": `token ${client.setting.gist}`
        };
        const repos = client.releases.get("all");
        for (let i = 0; i < repos.length; i++) {
            /* ----------------------- */
            const split = repos[i].split("|");
            const data = await fetch(`https://api.github.com/repos/${split[0]}/releases`, {
                headers: headers
            })
                .then((response) => response.json())
                .catch(() => { console.error });
            if (data.documentation_url) {
                console.log("api rate limited");
                console.log(split);
            } else {
                if (!data.tag_name) {

                } else if (split[1] == data.tag_name) {

                } else {
                    console.log("good compare");
                    /* ----------------------- */
                    for (let l = 0; l < repos.length; l++) {
                        if (repos[l] == repos[i]) {
                            repos.splice(l, 1);
                        }
                    }

                    /* ----------------------- */

                    client.releases.set("all", repos);
                    client.releases.push("all", split[0] + "|" + data[0].tag_name);

                    const url = data[0].html_url.split("/");

                    const servers = client.releases.keyArray();
                    const fetchs = await fetch(data[0].url, {
                        headers: headers
                    })
                        .then((response) => response.json())
                        .catch((e) => { });
                    /* ----------------------- */
                    SendMessage(servers, split, client, url, data, fetchs);

                    /* ----------------------- */
                }
            }
        }

        async function SendMessage(servers, split, client, url, data, fetchs) {
            for (let i = 0; i < servers.length; i++) {
                /* ----------------------- */
                let body = fetchs.body;
                if (servers[i] == "all") return;
                const bodylength = body.length;

                if (!body) body = "no description";
                if (bodylength > 1024) {

                    /* ----------------------- */
                    body = cutString(body, 400);
                    body += "....";
                }
                if (!client.releases.get(servers[i], "repos").includes(split[0])) {
                } else {
                    const id = client.releases.get(servers[i], "channel");
                    const channel = await client.channels.fetch(id).catch((e) => { });
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


    },
};
function cutString(s, n) {
    /* ----------------------- */
    const cut = s.indexOf(" ", n);
    if (cut == -1) return s;
    return s.substring(0, cut);
}