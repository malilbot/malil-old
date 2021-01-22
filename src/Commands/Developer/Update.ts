import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
const { exec } = require("child_process");

export default class updateCommand extends Command {
    public constructor() {
        super("Update", {
            aliases: ["update"],
            category: "Developer",
            quoted: true,
            description: {
                content: "",
                usage: "update",
                example: [
                    "update"
                ]
            },
            ratelimit: 3,
            ownerOnly: true,
            channel: "guild"
        });
    }

    public async exec(message: Message) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await message.reply("Updating")
    await exec('git pull && npm run build && pm2 restart 6 && echo "ayyyy done"', async (error, stdout, stderr) => {
            let output = ''
            if (error)   output = error
            if (stderr)  output = stderr
            if (stdout)  output = stdout
        const embed = new MessageEmbed()
            .setTitle(`Update`)
            .setColor("RED")
            .addField("🍞 Input", `\`\`\`bash\ngit pull && npm run build && pm2 restart 6\`\`\``)
            .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
            .addField("Type", "bash");
        await message.channel.send(embed);
    })

    }
}