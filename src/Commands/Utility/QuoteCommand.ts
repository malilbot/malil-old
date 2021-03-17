import { Command } from "discord-akairo";
import { MessageEmbed, TextChannel, Message, MessageAttachment } from "discord.js";

export default class QuoteCommand extends Command {
	public constructor() {
		super("quote", {
			aliases: ["quote", "qt"],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
				{
					id: "force",
					type: "boolean",
					match: "flag",
					flag: ["--force", "-f"],
				},
			],
			description: {
				content: "Quotes someone",
				usage: "quote",
				example: ["!quote https://canary.discord.com/channels/748956745409232945/777886689300709406/777889131829264384"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args, force }) {
		if (!args) return message.reply("please add a message link");
		if (!message.content.includes("/")) return message.reply("Please add a message link");

		const split = args.split(/\/| /);

		if (!split[5] || !split[6]) {
			return message.reply("message not found");
		}
		let chan;
		let msg: Message;

		try {
			chan = await this.client.channels.fetch(split[5]);
			msg = await (chan as TextChannel).messages.fetch(split[6]);
		} catch (error) {
			return message.reply("message not found");
		}

		let url = "";
		if (msg.attachments) {
			msg.attachments.forEach((attachment) => {
				url = attachment.url;
			});
		}
		if ((chan as TextChannel).nsfw == true) {
			if (!force) {
				return message.reply("nsfw");
			} else if (
				!this.client.gp.get("superUsers").includes(message.author.id) &&
				!this.client.settings.owners.includes(message.author.id)
			) {
				return message.reply("nsfw");
			}
		}

		let attachment: unknown;
		if (url) attachment = await new MessageAttachment(url);
		if (!message.member.guild.me.permissions.has(["MANAGE_WEBHOOKS"])) {
			return message.channel.send(
				new MessageEmbed()
					.setImage(url)
					.setAuthor(msg.author.tag, msg.author.avatarURL())
					.setDescription(msg.content)
					.setFooter("didnt have WebhookPermissions so send a embed instead")
			);
		}
		const name = msg.webhookID ? msg.author.username : msg.author.tag;
		const webhook = await (message.channel as TextChannel).createWebhook(name).then((webhook) =>
			webhook.edit({
				avatar: msg.author.displayAvatarURL({ size: 2048, format: "png" }),
			})
		);
		webhook
			.send(msg.content || msg.embeds, attachment)
			.then(() => webhook.delete())
			.catch(() => message.reply("Something went wrong"));
	}
}
