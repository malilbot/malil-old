import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
export default class ExecCommand extends Command {
    public constructor() {
        super("exec", {
            aliases: ["exec"],
            category: "Developer",
            description: {
                content: "Do some bash code",
                usage: "exec bash",
                example: [
                    "exec ls"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            ownerOnly: true,
            channel: "guild"
        });
    }

    public async exec(message: Message, { code }) {
        const { exec } = require("child_process");
            exec(code, async (error, stdout, stderr) => {
            let output = ''
            if (error)   output = error
            if (stderr)  output = stderr
            if (stdout)  output = stdout
        const embed = new MessageEmbed()
            .setTitle(`Exec`)
            .setColor("RED")
            .addField("🍞 Input", `\`\`\`bash\n${code}\`\`\``)
            .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
            .addField("Type", "bash");
        return message.channel.send(embed);
    })
    }
}
