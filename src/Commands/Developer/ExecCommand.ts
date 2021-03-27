import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { hst } from "../../lib/Utils";
import { exec } from "child_process";
export default class ExecCommand extends Command {
	public constructor() {
		super("exec", {
			aliases: ["exec"],
			category: "Developer",
			description: {
				content: "Do some bash code",
				usage: "exec bash",
				example: ["exec ls"],
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

	public async exec(message: Message, { code }) {
		exec(code, async (error, stdout, stderr) => {
			const embed = new MessageEmbed().setTitle(`Exec`).setColor(this.client.consts.colors.default).addField("🍞 Input", `\`\`\`bash\n${code}\`\`\``).addField("Type", "bash");
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

			return message.util.send({
				embed: embed,
				allowedMentions: { repliedUser: false },
			});
		});
	}
}
