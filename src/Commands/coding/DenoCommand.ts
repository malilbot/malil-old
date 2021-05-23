import Command from "../../Classes/malilCommand";
import type { CommandInteraction, Message } from "discord.js";
import c from "centra";
export default class DenoCommand extends Command {
	constructor() {
		super("deno", {
			aliases: ["deno"],
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
				content: "Searches the deno package repository for your deno package",
				example: ["deno discorddeno"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
		});
	}
	async exec(message: Message, { args }) {
		const pkg = await (await c(`https://api.deno.land/modules`, "GET").query("query", args).query("limit", 1).send()).json();

		if (!pkg.success || !pkg?.data?.results[0]) return this.client.t.get(message, "NO_MODULE_DENO");

		const result = pkg.data.results[0];

		message.channel?.send({
			embed: this.client.util
				.embed()
				.setColor("#FF0000")
				.setDescription(result.description || this.client.t.sget(message, "NO_DESCRIPTION"))
				.setTitle(`🦕 ${result.name}`)
				.setURL(`https://deno.land/x/${result.name}`),
		});
	}

	async execSlash(interaction: CommandInteraction) {
		const query = interaction?.options[0]?.value;

		const pkg = await (await c(`https://api.deno.land/modules`, "GET").query("query", query).query("limit", 1).send()).json();

		if (!pkg.success || !pkg?.data?.results[0]) return this.client.t.iget(interaction, "NO_MODULE_DENO");

		const result = pkg.data.results[0];

		const embed = this.client.util
			.embed()
			.setColor("#FF0000")
			.setDescription(result.description || this.client.t.sget(interaction, "NO_DESCRIPTION"))
			.setTitle(`🦕 ${result.name}`)
			.setURL(`https://deno.land/x/${result.name}`);
		interaction.reply(embed);
	}
}
