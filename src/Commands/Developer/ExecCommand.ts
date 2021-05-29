import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message } from "discord.js";
import { hst } from "../../Lib/Utils";
import { exec } from "child_process";
export default class ExecCommand extends Command {
	constructor() {
		super("exec", {
			aliases: ["exec"],
			category: "Developer",
			description: {
				content: "NO",
				example: "NO",
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
		exec(code, async (error, stdout, stderr) => {
			const embed = new MessageEmbed().setTitle(`Exec`).setColor(this.client.colors.default).addField("🍞 Input", `\`\`\`bash\n${code}\`\`\``).addField("Type", "bash");
			let output = "";

			if (stderr) output = stderr;
			if (stdout) output = stdout;
			if (output.length > 1024) {
				embed.addField("🫓 Output", await hst(output));
				embed.addField("Type", "shell");
			} else {
				embed.addField("🫓 Output", `\`\`\`ts\n${output}\`\`\``);
				embed.addField("Type", "shell");
			}

			return message.reply({
				embed: embed,
				allowedMentions: { repliedUser: false },
			});
		});
	}
}
