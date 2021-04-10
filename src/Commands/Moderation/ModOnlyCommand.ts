import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { MessageEmbed, Message, GuildChannel } from "discord.js";

export default class modonlyCommand extends Command {
	public constructor() {
		super("modonly", {
			aliases: ["modonly"],
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
				content: "Make a channel modeonly aka only people with manage messages can use commands there",
				usage: "modonly",
				example: ["modonly", "modonly #channel", "modonly <channel id>", "modonly get"],
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
			channel: "guild",
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }: { args: string }): Promise<Message> {
		let split: string[];
		if (args) args.replace(/<|#|>/g, "");

		if (args) split = args.split(" ");

		this.client.guilddata.ensure(message.guild.id, { modonly: [] });
		const modonly = (await this.client.guilddata.get(message.guild.id, "modonly")) ? await this.client.guilddata.get(message.guild.id, "modonly") : "none";

		if (!split || !split[0] || split[0] == "get") {
			if (modonly !== []) {
				let channels = "";
				for (const channel of modonly) {
					channels += `<#${channel}>\n`;
				}
				const embed = new MessageEmbed()
					.addField("ModOnly Channels", `${channels || `No mod only channels set you can set them by using ${this.client.prefixes.get(message.guild.id, "prefix") || "*"}modonly <channel>`}`)
					.setColor(this.client.consts.colors.default);
				message.util.send(embed);
			} else {
				message.util.send("Theres no modonly channels");
			}
		} else {
			const channel = (await message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == args)) || (await message.guild.channels.cache.get(split[0]));
			if (!channel) return message.util.send(new MessageEmbed().addField("not found", "the channel was not found please enter a valid channel").setColor(this.client.consts.colors.default));
			else {
				if (this.client.guilddata.get(message.guild.id, "modonly").includes(channel.id)) {
					const arr = this.client.blacklist.get("blacklisted", "list");
					for (let i = 0; i < arr.length; i++) {
						if (arr[i] == channel.id) {
							arr.splice(i, 1);
						}
					}
					this.client.guilddata.set(message.guild.id, arr, "modonly");
					return message.util.send(`${channel} is no longer modonly`);
				}
				const embed = new MessageEmbed().addField("modonly", `Added ${channel} to the modonly channels`).setColor(this.client.consts.colors.default);
				message.util.send(embed);
				this.client.guilddata.push(message.guild.id, channel.id, "modonly");
			}
		}
	}
}
