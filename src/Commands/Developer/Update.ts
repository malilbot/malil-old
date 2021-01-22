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

    public async exec(message: Message, { args }) {


        await exec('git pull', async (error, stdout, stderr) => {
            let output = ''
            if (error)   output = error
            if (stderr)  output = stderr
            if (stdout)  output = stdout
        const embed = new MessageEmbed()
            .setTitle(`Exec`)
            .setColor("RED")
            .addField("🍞 Input", `\`\`\`bash\ngit pull\`\`\``)
            .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
            .addField("Type", "bash");
        await message.channel.send(embed);
    })
    await exec('npm run build', async (error, stdout, stderr) => {
            let output = ''
            if (error)   output = error
            if (stderr)  output = stderr
            if (stdout)  output = stdout
        const embed = new MessageEmbed()
            .setTitle(`Exec`)
            .setColor("GREEN")
            .addField("🍞 Input", `\`\`\`bash\nnpm run build\`\`\``)
            .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
            .addField("Type", "bash");
        await message.channel.send(embed);
    })
    await message.channel.send("restarting")
    await exec('pm2 restart 6', async (error, stdout, stderr) => {
            let output = ''
            if (error)   output = error
            if (stderr)  output = stderr
            if (stdout)  output = stdout
        const embed = new MessageEmbed()
            .setTitle(`Exec`)
            .setColor("BLUE")
            .addField("🍞 Input", `\`\`\`bash\npm2 restart 6\`\`\``)
            .addField("🫓 Output", `\`\`\`bash\n${output}\`\`\``)
            .addField("Type", "bash");
        await message.channel.send(embed);
    })

    }
}