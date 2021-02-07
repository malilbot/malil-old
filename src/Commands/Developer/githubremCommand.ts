import { Command } from "discord-akairo";
import { MessageReaction } from "discord.js";
import { MessageEmbed, Message } from "discord.js";

export default class GithubremCommand extends Command {
	public constructor() {
		super("githubrem", {
			aliases: [
				"githubrem"
			],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "user",
					type: "member",
					match: "rest"
				},
				{
					id: "args",
					type: "string",
					match: "text"
				}
			],
			description: {
				content: "githubrem's a user",
				usage: "githubrem",
				example: [
					"githubrem"
				]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true
		});
	}

	public async exec(message: Message, { args, user }) {
		const id = user ? user.id : args;
		let repos = this.client.releases.get("all");

		for (var l = 0; l < repos.length; l++) {
			if (repos[l] == args) {
				repos.splice(l, 1);
			}
		}
		let z = this.client.releases.get("all").toString().replace(/,/g, "\n");
		let x = repos.toString().replace(/,/g, "\n");
		const embed = new MessageEmbed()
			.addField("old", `\`\`\`bash\n${z}\`\`\``)
			.addField("new", `\`\`\`python\n${x}\`\`\``);
		message.reply(embed);
		this.client.releases.set("all", repos);
	}
}
