import Command from "../../Classes/malilCommand";
import type { Message, TextChannel, CommandInteraction } from "discord.js";
import centra from "centra";
import { MessageEmbed, GuildMember } from "discord.js";
export default class GithubCommand extends Command {
	public constructor() {
		super("github", {
			aliases: ["github", "stalk"],
			category: "General",
			quoted: true,
			options: [
				{
					type: 1,
					name: "delete",
					description: "Delete the repos malil is watching.",
				},
				{
					type: 1,
					name: "get",
					description: "View the repos that are currently being watched by malil.",
				},
				{
					type: 1,
					name: "add",
					description: "Add a repo for malil to watch.",
					//@ts-expect-error this work but no
					options: [
						{
							type: 3,
							name: "repo",
							description: "link of the repository you want to add",
							required: true,
						},
					],
				},
				{
					type: 1,
					name: "set",
					description: "set the channel where the updates will be sent to",
					//@ts-expect-error hello
					options: [
						{
							type: 7,
							name: "channel",
							description: "The channel.",
							required: true,
						},
					],
				},
			],
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
				example: [
					"github add < github repo >",
					"github set < channel id >",
					"github delete",
					"github list",
					"github add https://github.com/malilbot/malilbot.github.io",
					"github set #general",
				],
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
			this.client.releases.set(message.guild.id, [], "repos");
			return message.util.send("oke deleted the github list");
		} else if (action == "add") {
			if (!this.client.releases.get(message.guild.id, "channel")) return message.util.send("no channel set please set one with: `github set <#channel> `");
			if (this.client.releases.get(message.guild.id, "repos").length > 5) return message.util.send("Sorry you can only have a maximum of 5 repos");
			const name = repo[3] + "/" + repo[4];
			if (!repo) return message.util.send("Please try the command again but this time send a repo link");
			const data = await (
				await centra(`https://api.github.com/repos/${name}/releases`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.github}`).send()
			).json();
			if (data.message == "Not Found") return message.util.send("Please try the command again but this time send a repo link");
			const urls = await (
				await centra(`https://api.github.com/repos/${name}`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.github}`).send()
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
			const thing = this.client.releases.get(message.guild.id, "repos");
			if (!thing) return message.util.send("Currently not watching anything");
			const embed = new MessageEmbed()
				.addField("**currently watching:**", thing.join("\n") || "nothing")
				.setColor(this.client.colors.green)
				.setFooter(this.client.user.username, this.client.user.avatarURL());
			message.util.send(embed);
		} else message.util.send("Check `*help github` for info about this command");
	}
	async execSlash(interaction: CommandInteraction) {
		const perms = (interaction.channel as TextChannel).permissionsFor(interaction.member as GuildMember).toArray();
		if (!perms.includes("MANAGE_ROLES") && !perms.includes("MANAGE_GUILD")) return interaction.reply("You dont have enough permissions to run this command");
		this.client.releases.ensure(interaction.guild.id, [], "repos");
		if (interaction.options[0].name == "delete") this.delete(interaction);
		else if (interaction.options[0].name == "set") this.set(interaction);
		else if (interaction.options[0].name == "add") this.add(interaction);
		else if (interaction.options[0].name == "get") this.get(interaction);
	}
	async delete(message: CommandInteraction) {
		this.client.releases.set(message.guild.id, [], "repos");
		return message.reply("oke deleted the github list");
	}
	async set(message: CommandInteraction) {
		const channel = message.options[0].options[0].channel;
		if (!["type", "text"].includes(channel?.type as string)) return message.reply("The channel has to be a textchannel");

		this.client.releases.set(message.guild.id, channel.id, "channel");
		return message.reply(`Succesfully set the channel to: ${channel}\nmake sure that i have **permission** to that channel`);
	}
	async add(message: CommandInteraction) {
		const repo = (message.options[0].options[0].value as string).split("/");
		if (!this.client.releases.get(message.guild.id, "channel")) return message.reply("no channel set please set one with: `github set <#channel> `");
		if (this.client.releases.get(message.guild.id, "repos").length > 5) return message.reply("Sorry you can only have a maximum of 5 repos");
		const name = repo[3] + "/" + repo[4];

		const data = await (
			await centra(`https://api.github.com/repos/${name}/releases`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.github}`).send()
		).json();
		if (data.message == "Not Found") return message.reply("Please try the command again but this time send a repo link");
		const urls = await (await centra(`https://api.github.com/repos/${name}`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.github}`).send()).json();
		if (urls.message == "Not Found") return message.reply("Please try the command again but this time send a repo link");
		if (urls.documentation_url) return message.reply("I have been api limited");
		let version: string;
		if (data[0]?.tag_name) version = data[0].tag_name;
		else version = "none";

		const url = data.html_url ? data.html_url : urls.html_url;

		const input = url.split("/");
		const output = input[3] + "/" + input[4] + "|" + version;
		message.reply(`Added: <${url}> to watch list.`);
		this.client.releases.push("all", output);
		this.client.releases.push(message.guild.id, name, "repos");
	}
	async get(message: CommandInteraction) {
		const repos = this.client.releases.ensure(message.guild.id, [], "repos");
		if (!repos) return message.reply("Currently not watching anything");
		const embed = this.client.util
			.embed()
			.addField("**currently watching:**", repos /** .join("\n")*/ || "nothing")
			.setColor(this.client.colors.green)
			.setFooter(this.client.user.username, this.client.user.avatarURL());
		message.reply(embed);
	}
}
