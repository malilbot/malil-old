import Command from "../../Classes/malilCommand";
import type { CommandInteraction, Message } from "discord.js";
import c from "centra";
export default class GithubUserCommand extends Command {
	public constructor() {
		super("githubuser", {
			aliases: ["githubuser", "ghu", "githubu"],
			category: "coding",
			quoted: false,
			args: [
				{
					id: "args",
					type: "args",
					match: "content",
				},
			],
			options: [
				{
					type: 3,
					name: "user",
					description: "github user you want to see the stats of",
					required: true,
				},
			],
			description: {
				content: "Gives information about a github user",
				example: ["github skyblockdev"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}
	async exec(message: Message, { args }) {
		const user = await (await c(`https://api.github.com/users/${args}`, "GET").header("Authorization", `token ${this.client.credentials.github}`).send()).json();

		if (user?.message) return message.reply("User not found");

		let info = "";
		if (user.email) info += `**email:** ${user.email}\n`;
		info += `**hireable:** ${user.hireable ? "YES" : "no"}\n`;
		if (user.blog) info += `**blog:** ${user.blog}\n`;
		if (user.location) info += `**location:** ${user.location}\n`;
		if (user.name) info += `**NickName:** ${user.name}\n`;
		if (user.bio) info += `**bio:** ${user.bio}\n`;
		let stats = "";
		stats += `**Joined at** ${user.created_at}\n`; //need help trying to format this
		stats += `**Public repos** ${user.public_repos || "none"}\n`;
		stats += `**Public gists** ${user.public_gists || "none"}\n`;
		stats += `**Followers** ${user.followers}\n`;
		stats += `**following** ${user.following}`;
		const embed = this.client.util.embed().setTitle(user.login).setTitle(user.html_url).addField("➥ Info", info).addField("➥ Stats", stats).setThumbnail(user.avatar_url);
		message.channel?.send({ embed });
	}
	async execSlash(interaction: CommandInteraction) {
		if (!interaction?.options[0]?.value) return interaction.reply({ content: "Please provide a user" });
		const user = await (await c(`https://api.github.com/users/${interaction.options[0].value}`, "GET").header("Authorization", `token ${this.client.credentials.github}`).send()).json();

		if (user?.message) return interaction.reply({ content: "User not found" });

		let info = "";
		if (user.email) info += `**email:** ${user.email}\n`;
		info += `**hireable:** ${user.hireable ? "YES" : "no"}\n`;
		if (user.blog) info += `**blog:** ${user.blog}\n`;
		if (user.location) info += `**location:** ${user.location}\n`;
		if (user.name) info += `**NickName:** ${user.name}\n`;
		if (user.bio) info += `**bio:** ${user.bio}\n`;
		let stats = "";
		stats += `**Joined at** ${user.created_at}\n`; //need help trying to format this
		stats += `**[Public repos](${user.repos_url})** ${user.public_repos || "none"}\n`;
		stats += `**[Public gists](${user.gists_url})** ${user.public_gists || "none"}\n`;
		stats += `**[Followers](${user.followers_url})** ${user.followers}\n`;
		stats += `**[following](${user.following_url})** ${user.following}`;
		const embed = this.client.util.embed().setTitle(user.login).setURL(user.html_url).addField("➥ Info", info).addField("➥ Stats", stats).setThumbnail(user.avatar_url);
		interaction.reply({ embed: embed });
	}
}
