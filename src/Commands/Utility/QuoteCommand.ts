import { Command } from "discord-akairo";
import { MessageEmbed, TextChannel, Message, MessageAttachment } from "discord.js";

export default class QuoteCommand extends Command {
	public constructor() {
		super("quote", {
			aliases: [
				"quote",
				"qt"
			],
			category: "Utility",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				},
				{
					id: 'force',
					type: 'boolean',
					match: 'flag',
					flag: ['--force', '-f'],
				}
			],
			description: {
				content: "Quotes someone",
				usage: "quote",
				example: [
					"!quote https://canary.discord.com/channels/748956745409232945/777886689300709406/777889131829264384"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args, force }) {
		const splito = args.split(" ");


		if (!splito) { message.reply("message not found") }
		const thing = (splito).join();
		const split = thing.split("/");
		if (!split[5] || !split[6]) { message.reply("message not found") }
		const channel = split[5];
		const msgid = split[6];
		const chan = await this.client.channels.fetch(channel).catch(() => { message.reply("message not found") });

		const msg = await (chan as TextChannel).messages.fetch(msgid).catch(() => { return message.reply("message not found") });

		let url = "";
		if (msg.attachments) {
			msg.attachments.forEach((attachment) => {
				url = attachment.url;
			});
		}
		if (this.client.gp.get("superUsers").includes(message.author.id) || this.client.setting.owners.includes(message.author.id) && force) {

		} else if ((chan as TextChannel).nsfw) return message.channel.send("nsfw");

		let attachment: unknown;
		if (url) attachment = await new MessageAttachment(url);
		if (
			!message.member.guild.me.permissions.has([
				"MANAGE_WEBHOOKS"
			])
		) {
			return message.channel.send(
				new MessageEmbed()
					.setImage(url)
					.setAuthor(msg.author.tag, msg.author.avatarURL())
					.setDescription(msg.content)
					.setFooter("didnt have WebhookPermissions so send a embed instead")
			);
		}

		// magic
		const webhook = await (message.channel as TextChannel)
			.createWebhook(msg.author.tag)
			.then((webhook) => webhook.edit({ avatar: msg.author.displayAvatarURL({ size: 2048, format: "png" }) }));
		//
		await webhook
			.send(msg.content, attachment)
			.then(() => webhook.delete())
			.catch(() => message.reply("Something went wrong"));
	}
}
