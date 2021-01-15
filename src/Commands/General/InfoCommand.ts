
import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class InfoCommand extends Command {
    public constructor() {
        super("info", {
            aliases: ["info"],
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
                content: "Gives some info about the os this bot is running on",
                usage: "info",
                example: [
                    "info"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {

const guild = this.client.guilds.cache.size
	let people = this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)

	
    const Embed = new MessageEmbed()
            .setColor('#03fc49')
            .setThumbnail('https://cdn.discordapp.com/avatars/336465356304678913/99a99b8c0cfe6e7669e7474a16dbb566.webp?size=128')
            			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{
					name: 'Bot info',
					value:
						'Node version `12.20.00`\nDiscord js version `12.5.1`\nCommand handler: `Akairo framework`\nOS: `Ubuntu Server` \nPrefix: `'+ '!' + '`\nHelp command `' + '!' + 'help`\nOwner <@336465356304678913>',
					inline: false,
				},
				{// Trickedbot > Active in ${client.guilds.cache.size} servers! Trickedbot > ${client.users.cache.size} People, thats alot║\n║ Trickedbot > ${client.channels.cache.size} different channels, thats alot ║`)
					name: 'Stats',
					value: 'Guilds: `' + guild + "`\nPeople: `" + people + "\n`Channels: `" + this.client.channels.cache.size + '`',
					inline: false,
				},
				{
					name: 'links: ',
					value:
						'https://discord.gg/TAp9Kt2\nhttps://www.youtube.com/channel/UC51x694Mps_rV6Kg2cKYZAQ?view_as=subscriber\nhttps://bots.discordlabs.org/bot/748985087420399717',
					inline: false,
				}
			);
message.reply(Embed)

    }
}