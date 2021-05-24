import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, TextChannel } from "discord.js";

export default class starboardCommand extends Command {
	constructor() {
		super("starboard", {
			aliases: ["starboard"],
			category: "Utility",
			quoted: true,
			description: {
				content: "STARBOARD_DESCRIPTION_CONTENT",
				example: "STARBOARD_DESCRIPTION_EXAMPLE",
			},
			args: [
				{
					id: "action",
					type: (_: Message, content: string) => {
						return content?.split(" ")[0];
					},
					match: "content",
				},
				{
					id: "args",
					type: (_: Message, content: string) => {
						return content?.split(" ").slice(1).join(" ");
					},
					match: "content",
				},
				{
					id: "channel",
					type: async (message: Message, content: string) => {
						const channel =
							message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == content.split(" ")[1]) ||
							message.guild.channels.cache.get(content.split(" ")[1]?.replace(/<#|>/g, ""));
						if (!channel) return;
						else if (["type", "text"].includes(channel?.type)) return channel;
					},
					match: "content",
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_CHANNELS"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { action, args, channel }: { action: string; args: string; channel: TextChannel }): Promise<Message | void> {
		const starboard = {
			emoji: "⭐",
			count: 3,
			channel: null,
		};
		const data = this.client.guilddata.ensure(message.guild.id, starboard, "starboard");
		if (action == "emoji") {
			const msg = await message.channel.send("React with what emoji you want to have as starboard emoji");
			const collector = msg.createReactionCollector((reaction, user) => user.id == message.author.id, { max: 1, time: 60000 });

			collector.on("collect", async (reaction, user) => {
				console.log(reaction.emoji);
				if (reaction.emoji.id == null) {
					data.emoji = reaction.emoji.name;
					this.client.guilddata.set(message.guild.id, data, "starboard");
					return message.reply(`Succesfully made ${reaction.emoji.name} the starboard emoji`);
				} else {
					//@ts-expect-error
					if (reaction.emoji?.guild?.id !== message.guild.id) {
						return message.reply("That emoji is not from this server.");
					} else {
						data.emoji = reaction.emoji.id;
						this.client.guilddata.set(message.guild.id, data, "starboard");
						return message.reply(`Succesfully set the starboard emoji to ${reaction.emoji}`);
					}
				}
			});
		} else if (action == "count") {
			const count = Number(args);
			if (!count) return message.reply("Thats not a number!");
			else if (count < 3 || count > 20) return message.reply(`The ${"stars"} count must be between 3 and 20`);
			data.count = count;
			this.client.guilddata.set(message.guild.id, data, "starboard");
			return message.reply(`Succesfully changed the minimum ${"stars"} needed to ${count}`);
		} else if (action == "channel" || action == "set") {
			if (!channel) return message.reply("Channel not found");
			data.channel = channel.id;
			this.client.guilddata.set(message.guild.id, data, "starboard");
			return message.reply(`Succesfully changed the starboard channel to ${channel}`);
		} else {
			return message.channel.send(
				this.client.util
					.embed()
					.setColor("GREEN")
					.addField("Starboard", `**Channel**: ${data.channel ? `<#${data.channel}>` : "Not set"}\n` + `**emoji**: ${data.emoji || "not set"}\n` + `**Count**: ${data.count || "not set"}`)
					.setFooter("Use help starboard to get started")
			);
		}

		//return message.util.send({ embed: embed, allowedMentions: { repliedUser: false } });
	}
}
