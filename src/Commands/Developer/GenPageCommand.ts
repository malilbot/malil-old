import { Command } from "discord-akairo";
import { MessageEmbed, Message, MessageAttachment } from "discord.js";
import { hst } from "../../Lib/Utils";
import { exec } from "child_process";
const prettier = require("prettier");
export default class GenPageCommand extends Command {
	public constructor() {
		super("genpage", {
			aliases: ["genpage"],
			category: "Developer",
			description: {
				content: "",
				usage: "",
				example: [""],
			},
			ratelimit: 3,
			args: [
				{
					id: "code",
					type: "string",
					match: "rest",
				},
			],
			ownerOnly: true,
			channel: "guild",
		});
	}

	public async exec(message: Message, { code }): Promise<void> {
		let file = "";
		if (code == "big") {
			for (const category of this.handler.categories.values()) {
				if (["default"].includes(category.id)) continue;
				if (category.id !== "Developer" && category.id !== "Custom") {
					file += "\n";
					file += `# ${category.id}\n`;
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => {
							file += "<details>";
							file += `<summary>${cmd}</summary>\n`;
							file += `### Aliasses\n * ${cmd.aliases.join("\n * ")} \n`;
							file += `### Information\n * ${cmd.description.content}\n`;
							file += "</details>\n";
						});
				}
			}
		} else {
			for (const category of this.handler.categories.values()) {
				if (["default"].includes(category.id)) continue;
				if (category.id !== "Developer" && category.id !== "Custom") {
					file += "\n";
					file += `| ${category.id} | description |\n`;
					file += "|:--------|:-------|\n";
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => {
							file += `| ${cmd} | ${cmd.description.content} |\n`;
						});
				}
			}
		}

		message.channel.send((await hst(prettier.format(file, { semi: false, parser: "markdown" }))) + ".md");
	}
}
