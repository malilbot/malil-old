import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetMember, ms } from "../../lib/Utils";

export default class MuteCommand extends Command {
	public constructor() {
		super("mute", {
			aliases: ["mute"],
			category: "Moderation",
			description: {
				content: "To mute member on this guild",
				usage: "mute < member > ",
				example: ["mute @member"],
			},
			ratelimit: 3,

			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES"],
			channel: "guild",
			args: [
				{
					id: "Args",
					match: "rest",
					type: "string",
				},
			],
		});
	}

	public async exec(message: Message, { Args }: { Args: string }) {
		if (!Args) return message.reply("Please provide a use rand a time");
		const args = Args.split(" ");
		/**GETTING THE TIME*/
		let time: number;
		time = ms(args[1]);
		if (!time) {
			time = ms(args[0]);
			if (!time) return message.reply("please provide a valid time");
		}
		let member: GuildMember;
		/**GETTING MEMBER*/
		member = await GetMember(message, args[0]);
		if (!member) {
			member = await GetMember(message, args[1]);
			if (!member) return message.reply("please provide a valid time");
		}
		const endtime = time + Date.now();
		const ENDS = endtime - Date.now();
		this.client.emit("mute", member, ENDS);
		this.client.logchannel.set(message.guild.id, {
			mutes: {
				[member.user.id]: endtime,
			},
		});

		const msg = function () {
			//execute tasks
			message.reply("times up");
		};
		setTimeout(msg, ENDS);
	}
}
