import Command from "../../Classes/malilCommand";
import type { Message, CommandInteraction, VoiceChannel } from "discord.js";
export default class YoutubeCommand extends Command {
	public constructor() {
		super("youtube", {
			aliases: ["youtube", "yt"],
			category: "Fun",
			quoted: true,
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
			description: {
				content: "Honestly dont know what this is",
				example: ["youtube #vc"],
			},
			clientPermissions: ["SEND_MESSAGES", "CREATE_INSTANT_INVITE"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { channel }): Promise<Message | void> {
		if (!channel) return message.reply("Thats not a voice channel or a channel.");
		else return await message.reply((await this.createInvite(channel as VoiceChannel)) + " Clieck on the link to join the youtube together session");
	}
	async execSlash(interaction: CommandInteraction) {
		const channel = interaction.options[0]?.channel;
		if (channel.type !== "voice") return interaction.reply("This command can only be used on a VoiceChannel");
		if (!channel.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return interaction.reply("I need the **create invite** permission for this command to work");

		return interaction.reply((await this.createInvite(channel as VoiceChannel)) + " Clieck on the link to join the youtube together session");
	}
	async createInvite(channel: VoiceChannel): Promise<string> {
		//@ts-expect-error
		return await this.client.api //@ts-expect-error
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
