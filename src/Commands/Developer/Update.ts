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
        let msg: Message
        await message.util.reply("Updating", { allowedMentions: { repliedUser: false } })
        await exec('git pull && yarn run build', async (error, stdout, stderr) => {
            let output = ''
            if (error) output = error
            if (stderr) output = stderr
            if (stdout) output = stdout
            const embed = new MessageEmbed()
                .setTitle(`Update`)
                .setColor(this.client.setting.colors.blue)
                .addField("🍞 Input", `\`\`\`bash\ngit pull && npm run build && pm2 restart 10\`\`\``)
                .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
                .addField("Type", "bash");
            msg = await message.channel.send(embed)
        })
    }
}