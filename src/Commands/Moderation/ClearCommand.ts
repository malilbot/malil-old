import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import ms from 'ms';
export default class ClearCommand extends Command {
    public constructor() {
        super("clear", {
            aliases: ["clear", "clean"],
            category: "Moderation",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "string",
                    match: "rest",
                }
            ],
            description: {
                content: "",
                usage: "clear",
                example: [
                    "clear"
                ]
            },
            ratelimit: 3,
            channel: "guild",
        });
    }

    public async exec(message, { args }) {
        if (!message.member.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(`Sorry i cant clear messages with my current permissions`);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have the manage messages permission")
		
			let num = args;
		let deleteCount = parseInt(args, 10) + 1;
		if (!deleteCount || deleteCount < 1 || deleteCount > 100)
			return message.reply(
				'Please provide a number between 1 and 99 for the number of messages to delete'
			);
            
            const fetched = await message.channel.messages.fetch({ limit: deleteCount });
			await message.channel
				.bulkDelete(fetched)
				.catch((error) => message.reply(`Couldn't delete messages because of: ${error}`) );
		
        
            const embeds = new MessageEmbed()
			.setColor('#ff00d9')
			.setDescription(`deleted ${num} messages`);
		message.channel
			.send(embeds)
			.then((msg) => {
				msg.delete({ timeout: 5000 });
			})
			.catch(console.error);
	
    }
}