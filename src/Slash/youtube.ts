import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";

export default class youtubeCommand extends Command {
	constructor() {
		super("youtube", {
			name: "youtube",
			description: "start a youtube together session",
			options: [
				{
					type: 7,
					name: "channel",
					description: "Channel you want yt togther in",
					required: true,
				},
			],
		});
	}

	async exec(message: CommandInteraction) {
		const channel = message.options[0]?.channel;
		if (channel.type !== "voice") return message.reply("This command can only be used on a textchannel");
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
