import { MessageEmbed, Message, TextChannel } from 'discord.js';
import { Listener } from "discord-akairo";
import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { hst } from '../../lib/Utils'
export default class CommandErrorListener extends Listener {
    public constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error',
            category: 'commands',
        });
    }

    public async exec(error: Error, message: Message, command: Command | null | undefined): Promise<void> {
        const errorNo = Math.floor(Math.random() * 6969696969) + 69; // hehe funy number
        const errorEmbed: MessageEmbed = new MessageEmbed()
            .setTitle(`Error # \`${errorNo}\`: An error occurred`)
            .setDescription(
                stripIndents`**User:** ${message.author} (${message.author.tag})
				**Command:** ${command}
				**Channel:** ${message.channel} (${message.channel.id})
				**Message:** [link](${message.url})`
            )
            .addField('Error', `${await hst(error.stack)}`)
            .setTimestamp();
        const errorUserEmbed: MessageEmbed = new MessageEmbed()
            .setTitle('An error occurred')
            .setTimestamp();
        const channel = await this.client.channels.fetch("815328569051971595");
        await (channel as TextChannel).send(errorEmbed)
        message.channel.send(errorUserEmbed)

    }
}