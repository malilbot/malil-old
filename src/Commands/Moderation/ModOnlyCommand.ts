import Command from "../../Classes/malilCommand";
import { TextChannel } from "discord.js";
import { MessageEmbed, Message, GuildChannel } from "discord.js";

export default class modonlyCommand extends Command {
	constructor() {
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
				content: "MODONLY_ESCRIPTION_CONTENT",
				example: "MODONLY_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
			channel: "guild",
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async exec(message: Message, { args }: { args: string }): Promise<Message> {
		let split: string[];
		if (args) args = args.replace(/<#|>/gi, "");

		if (args) split = args.split(" ");
		console.log(args);
		this.client.guilddata.ensure(message.guild.id, { modonly: [] });
		const modonly = (await this.client.guilddata.get(message.guild.id, "modonly")) ? await this.client.guilddata.get(message.guild.id, "modonly") : "none";

		if (!split || !split[0] || split[0] == "get") {
			if (modonly.length !== 0) {
				let channels = "";
				for (const channel of modonly) {
					channels += `<#${channel}>\n`;
				}
				const embed = new MessageEmbed()
					.addField("ModOnly Channels", `${channels || `No mod only channels set you can set them by using ${(await this.client.getPrefix(message.guild.id)) || "*"}modonly <channel>`}`)
					.setColor(this.client.colors.default);
				message.util.send(embed);
			} else {
				message.util.send("Theres are no modonly channels");
			}
		} else {
			const channel = (await message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == args)) || (await message.guild.channels.cache.get(split[0]));
			if (!channel) return message.util.send(new MessageEmbed().addField("not found", "the channel was not found please enter a valid channel").setColor(this.client.colors.default));
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
				const embed = new MessageEmbed().addField("modonly", `Added ${channel} to the modonly channels`).setColor(this.client.colors.default);
				message.util.send(embed);
				this.client.guilddata.push(message.guild.id, channel.id, "modonly");
			}
		}
	}
}
