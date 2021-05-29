import Command from "../../Classes/malilCommand";
import { MessageEmbed, GuildChannel, TextChannel, GuildMember, Message } from "discord.js";
import { utc } from "moment";
import { GetMember, ms, Infract } from "../../Lib/Utils";

export default class MuteCommand extends Command {
	constructor() {
		super("mute", {
			aliases: ["mute", "tempmute", "muterole", "mutedrole"],
			category: "Moderation",
			description: {
				content: "MUTE_DESCRIPTION_CONTENT",
				example: "MUTE_DESCRIPTION_EXAMPLE",
			},
			ratelimit: 3,

			clientPermissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
			channel: "guild",
			args: [
				{
					id: "user",
					type: async (message: Message, content: string) => {
						const member = await GetMember(message, content);

						return member;
					},
					match: "content",
				},
				{
					id: "time",
					type: async (_, content) => {
						return ms(content.split(" ")[1]) || "PERM";
					},
					match: "content",
				},
				{
					id: "args",
					type: async (message, content) => {
						return content.split(" ").slice(1).join(" ");
					},
					match: "content",
				},
				{
					id: "args2",
					type: async (message, content) => {
						return content;
					},
					match: "content",
				},
			],
		});
	}

	async exec(message: Message, { args, user, args2, time = "PERM" }: { args: string; user: GuildMember; args2: string; time: number | "PERM" }): Promise<Message> {
		const alias = message.util.parsed.alias;
		if (alias == "muterole" || alias == "mutedrole") {
			const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() == args2.toLowerCase()) || (await message.guild.roles.cache.get(args2));
			if (role?.id) {
				this.client.mutes.set(message.guild.id, role.id, "role");
				return message.reply("New muted role set to " + role.name);
			} else {
				return message.reply("Role not found please provide a valid role id");
			}
		}

		if (args[0] == "set" || args[0] == "role") {
			const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() == args.toLowerCase()) || (await message.guild.roles.cache.get(args));
			if (role?.id) {
				this.client.mutes.set(message.guild.id, role.id, "role");
				return message.reply("Muted role updated");
			} else {
				return message.reply("Role not found please provide a valid role id");
			}
		}

		this.client.mutes.ensure(message.guild.id, {
			role: null,
			mutes: {},
		});
		if (!user) return message.reply("No user provided.");
		const role = this.client.mutes.get(message.guild.id, "role");
		if (!role) return message.reply("No role setup use @malil muterole <your mute role>, to setup mutes");

		if (time !== "PERM" && time > 604800001) return message.reply("Cant mute longer than 7 days");
		if (time !== "PERM" && time < 59090) return message.reply("Sorry cant mute for less than one minute");

		if (user.user.id == this.client.user.id) return message.reply("HAHA you cant fool me into muting myself this easy");
		if (user.user.id == message.author.id) return message.reply("You cant mute yourself Dummy.");

		let ends: number, endtime: number, _time: string;

		if (typeof time !== "string") {
			endtime = time + Date.now();
			ends = endtime - Date.now();
			const mutes = this.client.mutes.get(message.guild.id, "mutes");
			mutes[user.user.id] = endtime;
			this.client.mutes.set(message.guild.id, mutes, "mutes");
			_time = time.toString();
		}

		this.client.emit("mute", user, ends || time, message);
		message.reply(`**Muted ${user.user.tag}**`);

		Infract(message, (_time as any) || time, user, "MUTE", this.client);
	}
}
