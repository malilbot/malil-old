import Command from "../../Classes/malilCommand";
import type { Message, CommandInteraction, VoiceChannel } from "discord.js";
export default class YoutubeCommand extends Command {
	constructor() {
		super("youtube", {
			aliases: ["youtube", "yt"],
			category: "Fun",
			quoted: true,
			slash: true,
			args: [
				{
					id: "channel",
					type: async (message: Message, content: string) => {
						console.log(content);
						const channel = message.guild.channels.cache.find((channel) => channel.name.toLowerCase() == content) || message.guild.channels.cache.get(content?.replace(/<#|>/g, ""));
						if (!channel) return;
						else if (["voice"].includes(channel?.type)) return channel;
					},
					match: "content",
				},
			],
			options: [
				{
					type: 7,
					name: "channel",
					description: "the channel you want to start the youtube together session in",
					required: true,
				},
			],
			description: {
				content: "YOUTUBE_DESCRIPTION_CONTENT",
				example: "YOUTUBE_DESCRIPTION_EXAMPLE",
			},
			clientPermissions: ["SEND_MESSAGES", "CREATE_INSTANT_INVITE"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	async exec(message: Message, { channel }): Promise<Message | void> {
		if (!["voice"].includes(channel?.type)) return message.reply("Thats not a voice channel or a channel.");
		if (!channel) return message.reply("Thats not a voice channel or a channel.");
		else return message.reply((await this.createInvite(channel as VoiceChannel)) + " Clieck on the link to join the youtube together session");
	}

	async createInvite(channel: VoiceChannel): Promise<string> {
		//@ts-expect-error
		return this.client.api //@ts-expect-error
			.channels(channel.id)
			.invites.post({
				data: {
					validate: null,
					max_age: 604800,
					max_uses: 0,
					target_type: 2,
					target_application_id: "755600276941176913",
					temporary: false,
				},
			})
			.then((invite) => `https://discord.gg/${invite.code}`);
	}
}
