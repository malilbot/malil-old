import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";

export default class GithubremCommand extends Command {
	constructor() {
		super("githubrem", {
			aliases: ["githubrem"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "user",
					type: "member",
					match: "rest",
				},
				{
					id: "args",
					type: "string",
					match: "text",
				},
			],
			description: {
				content: "NO",
				example: "NO",
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	exec(message: Message, { args, user }): void {
		const repos = this.client.releases.get("all");

		for (let l = 0; l < repos.length; l++) {
			if (repos[l] == args) {
				repos.splice(l, 1);
			}
		}
		const z = this.client.releases.get("all").toString().replace(/,/g, "\n");
		const x = repos.toString().replace(/,/g, "\n");
		const embed = new MessageEmbed().addField("old", `\`\`\`bash\n${z}\`\`\``).addField("new", `\`\`\`bash\n${x}\`\`\``);
		message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
		this.client.releases.set("all", repos);
	}
}
