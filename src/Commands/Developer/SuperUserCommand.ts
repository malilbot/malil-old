import { Command } from "discord-akairo";
import { MessageEmbed, Message, TextChannel, User, GuildMember } from "discord.js";
import { GetMember } from "../../lib/Utils";
export default class SuperUserCommand extends Command {
	public constructor() {
		super("superUser", {
			aliases: ["sudo", "su", "superUsers"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "content",
					match: "rest",
				},
			],
			description: {
				content: "Set a user as a superuser",
				usage: "su",
				example: ["su"],
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	public async exec(message: Message, { args }) {
		if (!args) {
			let list = "";
			const arr = this.client.gp.get("superUsers");
			await arr.forEach(async (item: string) => {
				const name = (await this.client.users.fetch(item)) as User;

				list += `${name.tag}: ${name.id}\n`;
			});

			return message.util.send(list || "Noone f......");
		}
		let Member: GuildMember | User = (await GetMember(message, args)).user;
		if (!Member) Member = await this.client.users.fetch(args);
		if (!Member) {
			return message.util.send("User not found");
		}
		const userID = Member.id;

		if (this.client.gp.get("superUsers").includes(userID)) {
			const arr = this.client.gp.get("superUsers");
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == userID) {
					arr.splice(i, 1);
				}
			}

			this.client.gp.set("superUsers", arr);
			return message.util.send(`Removed ${Member.tag} from SuperUser list`);
		}
		this.client.gp.push("superUsers", userID);
		message.util.send(`Added ${Member.tag} to SuperUser list`);
	}
}
