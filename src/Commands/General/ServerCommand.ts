
import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class ServerCommand extends Command {
    public constructor() {
        super("server", {
            aliases: ["server"],
            category: "General",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            description: {
                content: "Get some info about the discord server",
                usage: "server",
                example: [
                    "server"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
let yes = args[1];
		let embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Server Info')
			.setDescription(`${message.guild}'s information`)
			.addField('Owner', `The owner of this server is ${message.guild.owner}`)
			.addField(
				'Member Count',
				`This server has ${message.guild.memberCount} members`
			)
			.addField(
				'Emoji Count',
				`This server has ${message.guild.emojis.cache.size} emojis`
			)
			.addField(
				'Roles Count',
				`This server has ${message.guild.roles.cache.size} roles`
			)
			.addField(
				'Chanel Count',
				`This server has ${message.guild.channels.cache.size} channels`
			);

        message.channel.send(embed);
        
		if (!yes) return;
		let rolemap = message.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((r) => r)
			.join(',');
		if (rolemap.length > 1024) rolemap = 'To many roles to display';
		if (!rolemap) rolemap = 'No roles';
		const Embed = new MessageEmbed()
			.setColor('#03fc49')
			.addField('Role List', rolemap);
        message.reply(Embed);


    }
}