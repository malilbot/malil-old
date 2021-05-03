import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { MessageEmbed, Message, GuildChannel } from "discord.js";

export default class LogChannelCommand extends Command {
	public constructor() {
		super("logchannel", {
			aliases: ["logchannel", "modlogs"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "A way to log all actions in the Moderation category requires manage server permissions to use",
				usage: "logchannel",
				example: ["logchannel", "logchannel #channel", "logchannel <channel id>", "logchannel get"],
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS"],
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<void> {
		let split: string;
		if (args) args = args.replace(/<|#|>/g, "");

		if (args) split = args.split(" ");

		this.client.logchannel.ensure(message.guild.id, "");
		const logchannel = (await this.client.logchannel.get(message.guild.id)) ? await this.client.logchannel.get(message.guild.id) : "none";

		if (split[0] == "set") {
			const channel = (await message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == split[1])) || message.guild.channels.cache.get(split[1]);
			if (!channel) message.util.send(new MessageEmbed().addField("not found", "the channel was not found please enter a valid channel").setColor(this.client.colors.default));
			else {
				const embed = new MessageEmbed().addField("logs", "alright set the log channel to " + (await channel.name)).setColor(this.client.colors.default);
				message.util.send(embed);
				this.client.logchannel.set(message.guild.id, channel.id);
			}
		} else if (!split || !split[0] || split[0] == "get") {
			if (logchannel !== "none") {
				const cnl = await this.client.channels.fetch(logchannel).catch((e) => message.util.send("channel not found"));
				const embed = new MessageEmbed().addField("logs", "The current log channel is " + (cnl as GuildChannel).name || "`Channel missing or deleted`").setColor(this.client.colors.default);
				message.util.send(embed);
			} else message.util.send("no log channel set yet use @malil set < channel id >");
		} else {
			const channel = (await message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == args)) || (await message.guild.channels.cache.get(split[0]));
			if (!channel) message.util.send(new MessageEmbed().addField("not found", "the channel was not found please enter a valid channel").setColor(this.client.colors.default));
			else {
				const embed = new MessageEmbed().addField("logs", "alright set the log channel to " + (await channel.name)).setColor(this.client.colors.default);
				message.util.send(embed);
				this.client.logchannel.set(message.guild.id, channel.id);
			}
		}
	}
}
