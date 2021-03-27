import { Command } from "discord-akairo";
import { MessageEmbed, Message, GuildMember, User } from "discord.js";
import { GetMember } from "../../lib/Utils";
export default class BlacklistCommand extends Command {
	public constructor() {
		super("blacklist", {
			aliases: ["blacklist"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "string",
					match: "text",
				},
			],
			description: {
				content: "blacklist's a user",
				usage: "blacklist",
				example: ["blacklist"],
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	public async exec(message: Message, { args, user }) {
		/*
		const id = user ? user.id : args;
		this.client.blacklist.push("blacklisted", id, "list");
		message.util.send("Users blacklisted: " + id, { allowedMentions: { repliedUser: false } });
		*/
		if (!args) {
			let list = "";
			const arr = this.client.blacklist.get("blacklisted", "list");
			await arr.forEach(async (item: string) => {
				const name = (await this.client.users.fetch(item)) as User;

				list += `${name.tag}: ${name.id}\n`;
			});

			return message.util.send(list || "Laughs in noone blacklisted");
		}
		let Member: GuildMember | User = (await GetMember(message, args)).user;
		if (!Member) Member = await this.client.users.fetch(args);
		if (!Member) {
			return message.util.send("User not found");
		}
		const userID = Member.id;

		if (this.client.blacklist.get("blacklisted", "list").includes(userID)) {
			const arr = this.client.blacklist.get("blacklisted", "list");
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == userID) {
					arr.splice(i, 1);
				}
			}

			this.client.blacklist.set("blacklisted", arr, "list");
			return message.util.send(`Removed ${Member.tag} from blacklist`);
		}
		this.client.blacklist.push("blacklisted", userID, "list");
		message.util.send(`Added ${Member.tag} to blacklist`);
	}
}
