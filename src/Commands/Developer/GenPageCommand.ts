import Command from "../../Classes/malilCommand";
import { Message } from "discord.js";
import { hst } from "../../Lib/Utils";
import { join } from "path";
import { writeFileSync } from "fs";
import { exec } from "child_process";
const prettier = require("prettier");
export default class GenPageCommand extends Command {
	constructor() {
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

	async exec(message: Message, { code }): Promise<void> {
		if (code == "big") {
			for (const category of this.handler.categories.values()) {
				if (["default"].includes(category.id)) continue;

				if (category.id !== "Developer" && category.id !== "Custom") {
					let file = "";
					file += "\n";
					file += `## ${category.id}\n`;
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => {
							file += `### ${cmd}\n${cmd.description.content}\n`;
							file += `#### Aliasses\n * ${cmd.aliases.join("\n * ")} \n`;
							file += `#### Examples\n * ${cmd.description.example.join("\n * ").replace(/</gi, "〈").replace(/>/gi, "〉")}\n`;
						});
					writeFileSync(join(__dirname, "..", "..", "..", "docs", "commands", `${category.id}.md`), file);
				}
			}
			console.log(`tar -czvf  backups/pages.tar.gz ${join(__dirname, "..", "..", "..", "docs", "commands")}`);
			exec(`tar -czvf  backups/pages.tar.gz docs/commands`, async () => {
				message.channel.send({ content: `Some cool files :sunglasses:`, files: [`backups/pages.tar.gz`] });
			});
		} else {
			let file = "";
			for (const category of this.handler.categories.values()) {
				if (["default"].includes(category.id)) continue;
				if (category.id !== "Developer" && category.id !== "Custom") {
					file += "\n<!--This is a auto generated page to change the contents of this edit the command files themself-->";
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
			message.channel.send((await hst(prettier.format(file, { semi: false, parser: "markdown" }))) + ".md");
		}
	}
}
