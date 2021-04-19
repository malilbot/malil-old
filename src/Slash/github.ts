import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";
import centra from "centra";
export default class githubCommand extends Command {
	constructor() {
		super("github", {
			name: "github",
			description: "Allows you to keep an eye on github repos and get the latest releases of them.",
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
					//@ts-expect-error
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
					//@ts-expect-error
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
		});
	}

	async exec(message: CommandInteraction) {
		if (message.options[0].name == "delete") this.delete(message);
		else if (message.options[0].name == "set") this.set(message);
		else if (message.options[0].name == "add") this.add(message);
		else if (message.options[0].name == "get") this.get(message);
	}
	async delete(message: CommandInteraction) {
		this.client.releases.set(message.guild.id, [], "repos");
		return message.reply("oke deleted the github list");
	}
	async set(message: CommandInteraction) {
		const channel = message.options[0].options[0].channel;
		if (!["type", "text"].includes(channel?.type)) return message.reply("The channel has to be a textchannel");

		this.client.releases.set(message.guild.id, channel.id, "channel");
		return message.reply(`Succesfully set the channel to: ${channel}\nmake sure that i have **permission** to that channel`);
	}
	async add(message: CommandInteraction) {
		const repo = (message.options[0].options[0].value as string).split("/");
		if (!this.client.releases.get(message.guild.id, "channel")) return message.reply("no channel set please set one with: `github set <#channel> `");
		if (this.client.releases.get(message.guild.id, "repos").length > 5) return message.reply("Sorry you can only have a maximum of 5 repos");
		const name = repo[3] + "/" + repo[4];

		const data = await (
			await centra(`https://api.github.com/repos/${name}/releases`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.gist}`).send()
		).json();
		if (data.message == "Not Found") return message.reply("Please try the command again but this time send a repo link");
		const urls = await (await centra(`https://api.github.com/repos/${name}`, "GET").header("User-Agent", "Malil").header("Authorization", `token ${this.client.credentials.gist}`).send()).json();
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
		const repos = this.client.releases.get(message.guild.id, "repos");
		if (!repos) return message.reply("Currently not watching anything");
		const embed = this.client.util
			.embed()
			.addField("**currently watching:**", repos /** .join("\n")*/ || "nothing")
			.setColor(this.client.consts.colors.green)
			.setFooter(this.client.user.username, this.client.user.avatarURL());
		message.reply(embed);
	}
}
