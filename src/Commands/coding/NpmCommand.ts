import Command from "../../Classes/malilCommand";
import { CommandInteraction, Message, MessageCollector, TextChannel } from "discord.js";
import c from "centra";
export default class NpmCommand extends Command {
	constructor() {
		super("npm", {
			aliases: ["npm", "node", "nodejs"],
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
					name: "package",
					description: "The package you want to search for",
					required: true,
				},
			],
			description: {
				content: "Searches the npm repositorys for the requested npm package",
				example: ["npm discord.js"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}
	async exec(message: Message, { args }) {
		const pkg = await (await c(`https://api.npms.io/v2/search`, "GET").query("q", args).query("size", 1).send()).json();

		if (!pkg?.results[0])
			return message.reply({
				content: "<:no:838017092216946748> Please provide a message",
			});
		const result = pkg.results[0].package;
		message.channel?.send({
			embed: this.client.util
				.embed()
				.setColor("#FF0000")
				.setDescription(result.description || "No description provided")
				.addField("❯ Author", result.author.name)
				.addField("❯ Created", result.date)
				.addField("❯ Scoped", `${result.scoped || "No"}`)
				.addField("❯ Version", `${result.version || "Unspecified"}`)
				.setFooter(` Tags: ${result.keywords[0] || "none"}, ${result.keywords[1] || "none"}, ${result.keywords[3] || "none"}`)
				.setTitle(`<:npm:838350149725061169> ${result.name}`)
				.setURL(result.links.npm),
		});
	}
	async execSlash(interaction: CommandInteraction) {
		const query = interaction?.options[0]?.value;
		const pkg = await (await c(`https://api.npms.io/v2/search`, "GET").query("q", query).query("size", 1).send()).json();

		if (!pkg?.results[0])
			return interaction.reply({
				content: "<:no:838017092216946748> Package not found",
			});
		const result = pkg.results[0].package;
		const embed = this.client.util
			.embed()
			.setColor("#FF0000")
			.setDescription(result.description || "No description provided")
			.addField("❯ Author", result.author.name)
			.addField("❯ Created", result.date)
			.addField("❯ Scoped", `${result.scoped || "No"}`)
			.addField("❯ Version", `${result.version || "Unspecified"}`)
			.setFooter(` Tags: ${result.keywords[0] || "none"}, ${result.keywords[1] || "none"}, ${result.keywords[3] || "none"}`)
			.setTitle(`<:npm:838350149725061169> ${result.name}`)
			.setURL(result.links.npm);
		interaction.reply(embed);
	}
}
