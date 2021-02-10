import { Listener } from "discord-akairo";
import Client from "../../client/Client";
import { MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";

export default class github extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("github", {
			emitter: "client",
			event: "ready",
			category: "client"
		});
		this.client = client;
	}

	async exec() {
		setInterval(async () => {
			const headers = {
				"Content-Authorization": `token ${process.env.gist}`
			};
			let repos = this.client.releases.get("all");
			for (var i = 0; i < repos.length; i++) {
				/* ----------------------- */
				let split = repos[i].split("|");
				const data = await fetch(`https://api.github.com/repos/${split[0]}/releases`, {
					headers: headers
				})
					.then((response) => response.json())
					.catch((e) => {});
				if (data.documentation_url) {
					console.log("api rate limited");
					console.log(split);
				} else {
					console.log(data[0] || "FFFFFFFFFFFFFSSSSSSSSSSSSSSSSSSSSSSS STOP WITH ERRORS THANKS DADDY");
					console.log(data);
					if (!data[0].tag_name) {
						console.log("eeee");
					} else if (split[1] == data[0].tag_name) {
						console.log("eeeee");
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
							.catch((e) => {});
						/* ----------------------- */
						SendMessage(servers, split, this.client, url, data, fetchs);

						/* ----------------------- */
					}
				}
			}
		}, 1800000);

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
					let channel = await client.channels.fetch(id).catch((e) => {});
					if (!channel) {
					} else {
						const embed = new MessageEmbed()
							.setDescription(data[0].html_url)
							.setTitle("new release from:  " + data[0].author.login)
							.addField(url[4] + " " + data[0].tag_name, body);

						await (channel as TextChannel).send(embed).catch((e) => {});
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

		/*
        [
  {
    url: 'https://api.github.com/repos/SkyBlockDev/The-trickster/releases/35188037',
    assets_url: 'https://api.github.com/repos/SkyBlockDev/The-trickster/releases/35188037/assets',
    upload_url: 'https://uploads.github.com/repos/SkyBlockDev/The-trickster/releases/35188037/assets{?name,label}',
    html_url: 'https://github.com/SkyBlockDev/The-trickster/releases/tag/2.31.1',
    id: 35188037,
    author: {
      login: 'SkyBlockDev',
      id: 72335827,
      node_id: 'MDQ6VXNlcjcyMzM1ODI3',
      avatar_url: 'https://avatars.githubusercontent.com/u/72335827?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/SkyBlockDev',
      html_url: 'https://github.com/SkyBlockDev',
      followers_url: 'https://api.github.com/users/SkyBlockDev/followers',
      following_url: 'https://api.github.com/users/SkyBlockDev/following{/other_user}',
      gists_url: 'https://api.github.com/users/SkyBlockDev/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/SkyBlockDev/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/SkyBlockDev/subscriptions',
      organizations_url: 'https://api.github.com/users/SkyBlockDev/orgs',
      repos_url: 'https://api.github.com/users/SkyBlockDev/repos',
      events_url: 'https://api.github.com/users/SkyBlockDev/events{/privacy}',
      received_events_url: 'https://api.github.com/users/SkyBlockDev/received_events',
      type: 'User',
      site_admin: false
    },
    node_id: 'MDc6UmVsZWFzZTM1MTg4MDM3',
    tag_name: '2.31.1',
    target_commitish: 'master',

        */
	}
}
