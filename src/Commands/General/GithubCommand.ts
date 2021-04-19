import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import centra from "centra";
import { MessageEmbed } from "discord.js";
export default class GithubCommand extends Command {
	public constructor() {
		super("github", {
			aliases: ["github", "stalk"],
			category: "General",
			quoted: true,
			args: [
				{
					id: "action",
					type: (_: Message, content: string) => {
						return content?.split(" ")[0];
					},
					match: "content",
				},
				{
					id: "repo",
					type: (_: Message, content: string) => {
						return content?.split(" ").slice(1).join(" ").split("/");
					},
					match: "content",
				},
				{
					id: "channel",
					type: async (message: Message, content: string) => {
						const channel =
							message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == content.split(" ")[1]) ||
							message.guild.channels.cache.get(content.split(" ")[1]?.replace(/<#|>/g, ""));
						if (!channel) return;
						else if (["type", "text"].includes(channel?.type)) return channel;
					},
					match: "content",
				},
			],
			description: {
				content: "Watches github releases from a github repo",
				usage: "github",
				example: ["github add < github repo >", "github set < channel id >", "github delete", "github list"],
			},
			ratelimit: 1,
			channel: "guild",
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
		});
	}

	public async exec(message: Message, { action, channel, repo }: { action: string; channel: TextChannel; repo: string[] }): Promise<Message> {
		console.log(repo);
		if (!action) return message.util.send("use  *github set <#channel> to get started use *help github for more info");

		this.client.releases.ensure(message.guild.id, { channel: "", repos: [] });

		if (action == "set") {
			if (!channel) return message.reply("Channel not found / thats not a text channel");
			message.util.send(`Succesfully set the channel to: ${channel}\nmake sure that i have permission to that channel`);

			this.client.releases.set(message.guild.id, channel.id, "channel");
		} else if (action == "delete") {
			this.client.releases.delete(message.guild.id, "repos");
			this.client.releases.set(message.guild.id, {}, "repos");
			return message.util.send("oke deleted the github list");
		} else if (action == "add") {
			if (!this.client.releases.get(message.guild.id, "channel")) return message.util.send("no channel set please set one with: `github set <#channel> `");
			if (this.client.releases.get(message.guild.id, "repos").length > 5) return message.util.send("Sorry you can only have a maximum of 5 repos");
			const name = repo[3] + "/" + repo[4];
			if (!repo) return message.util.send("Please try the command again but this time send a repo link");
			const data = await (
				await centra(`https://api.github.com/repos/${name}/releases`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.gist}`).send()
			).json();
			if (data.message == "Not Found") return message.util.send("Please try the command again but this time send a repo link");
			const urls = await (
				await centra(`https://api.github.com/repos/${name}`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.gist}`).send()
			).json();
			if (urls.message == "Not Found") return message.util.send("Please try the command again but this time send a repo link");
			if (urls.documentation_url) return message.util.send("I have been api limited");
			let version;
			if (data[0]?.tag_name) version = data[0].tag_name;
			else version = "none";

			const url = data.html_url ? data.html_url : urls.html_url;

			const input = url.split("/");
			const output = input[3] + "/" + input[4] + "|" + version;
			message.util.send("Added: <" + url + "> to watch list.");
			this.client.releases.push("all", output);
			this.client.releases.push(message.guild.id, name, "repos");
		} else if (action == "list") {
			const thing = this.client.releases.get(message.guild.id, "repos").join("\n");
			if (!thing) return message.util.send("Currently not watching anything");
			const embed = new MessageEmbed()
				.addField("**currently watching:**", thing || "nothing")
				.setColor(this.client.consts.colors.green)
				.setFooter(this.client.user.username, this.client.user.avatarURL());
			message.util.send(embed);
		} else message.util.send("Check `*help github` for info about this command");

		/*
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
