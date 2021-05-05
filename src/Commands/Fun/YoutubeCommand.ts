import Command from "../../Classes/malilCommand";
import type { Message, CommandInteraction } from "discord.js";
export default class YoutubeCommand extends Command {
	public constructor() {
		super("youtube", {
			aliases: ["youtube", "yt"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "youtube",
				},
			],
			description: {
				content: "Honestly dont know what this is",
				example: ["youtube #vc"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<Message | void> {
		console.log("Make youtube command");
		console.log("Make youtube command");
		console.log("Make youtube command");
		console.log("Make youtube command");
		message.reply("Soon:tm:");
	}
	async execSlash(message: CommandInteraction) {
		const channel = message.options[0]?.channel;
		if (channel.type !== "voice") return message.reply("This command can only be used on a textchannel");
		if (!channel.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.reply("I need the **create invite** permission for this command to work");
		//@ts-expect-error
		this.client.api //@ts-expect-error
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
			.then((invite) => {
				message.reply(`https://discord.gg/${invite.code}`);
			});
	}
}
