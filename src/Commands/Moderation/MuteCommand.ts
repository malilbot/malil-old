import { Command } from "discord-akairo";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetMember, ms, Infract } from "../../Lib/Utils";

export default class MuteCommand extends Command {
	public constructor() {
		super("mute", {
			aliases: ["mute", "tempmute", "muterole", "mutedrole"],
			category: "Moderation",
			description: {
				content: "Use to mute members",
				usage: "mute < member > ",
				example: ["mute @member", "mute @member 1d", "mute 2d @member"],
			},
			ratelimit: 3,

			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
			channel: "guild",
			args: [
				{
					id: "user",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
				{
					id: "Args",
					match: "rest",
					type: "string",
				},
			],
		});
	}

	public async exec(message: Message, { Args, user }: { Args: string; user: GuildMember }): Promise<Message> {
		if (!Args) return message.util.send("No user provided.");
		const args = Args.split(" ");
		const alias = message.util.parsed.alias;
		if (alias == "muterole" || alias == "mutedrole") {
			const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() == Args) || (await message.guild.roles.cache.get(Args)) || (await message.guild.roles.fetch(Args));
			if (role?.id) {
				this.client.mutes.set(message.guild.id, role.id, "role");
				return message.util.send("New muted role set to " + role.name);
			} else {
				return message.util.send("Role not found please provide a valid role id");
			}
		}
		this.client.mutes.ensure(message.guild.id, {
			role: null,
			mutes: {},
		});
		const role = this.client.mutes.get(message.guild.id, "role");
		if (args[0] == "set" || args[0] == "role") {
			const role = await message.guild.roles.fetch(args[1]);
			if (role?.id) {
				this.client.mutes.set(message.guild.id, role.id, "role");
				return message.util.send("Muted role updated");
			} else {
				return message.util.send("Role not found please provide a valid role id");
			}
		}
		if (!role) return message.util.send("No role setup use @malil muterole <your mute role>, to setup mutes");
		if (!Args && role) return message.util.send("Please provide a user and a time");

		/**GETTING THE TIME*/
		let time;

		time = ms(args[1]);
		if (!time) {
			time = ms(args[0]);
			if (!time) time = "PERM";
		}
		if (time > 604800001 && time !== "perm") return message.util.send("Cant mute longer than 7 days");
		if (time < 59090 && time !== "perm") return message.util.send("Sorry cant mute for less than one minute");

		if (!user) {
			user = await GetMember(message, args[1]);
			if (!user) return message.util.send("Please say who you want to mute");
		}
		if (user.user.id == this.client.user.id) return message.util.send("HAHA you cant fool me into muting myself this easy");
		if (user.user.id == message.author.id) return message.util.send("You cant mute yourself Dummy.");
		let ENDS: number;
		let endtime: number;
		if (typeof time !== "string") {
			endtime = time + Date.now();
			ENDS = endtime - Date.now();
		}
		let _time: string;
		this.client.emit("mute", user, ENDS || time);
		message.util.send(`**Muted ${user.user.tag}**`);
		if (typeof time !== "string") {
			const mutes = this.client.mutes.get(message.guild.id, "mutes");
			mutes[user.user.id] = endtime;
			this.client.mutes.set(message.guild.id, mutes, "mutes");
			_time = time.toString();
		}
		Infract(message, _time || time, user, "MUTE", this.client);
	}
}
