import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, TextChannel, User, GuildMember } from "discord.js";
import { GetMember } from "../../Lib/Utils";
export default class SuperUserCommand extends Command {
	constructor() {
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
				{
					id: "member",
					type: async (message, content) => {
						let member = await GetMember(message, content);
						if (member) return member;
					},
					match: "content",
				},
			],
			description: {
				content: "NO",
				example: "NO",
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	async exec(message: Message, { args, member }: { args: string; member: GuildMember }): Promise<Message> {
		if (!args) {
			let list = "";
			const arr = this.client.gp.get("superUsers");
			await arr.forEach(async (item: string) => {
				const name = (await this.client.users.fetch(item)) as User;

				list += `${name.tag}: ${name.id}\n`;
			});

			return message.util.send(list || "Noone f......");
		}
		if (!member) {
			return message.util.send("User not found");
		}
		if (this.client.gp.get("superUsers").includes(member.id)) {
			const arr = this.client.gp.get("superUsers");
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == member.id) {
					arr.splice(i, 1);
				}
			}

			this.client.gp.set("superUsers", arr);
			return message.util.send(`Removed ${member.user.tag} from SuperUser list`);
		}
		this.client.gp.push("superUsers", member.id);
		message.util.send(`Added ${member.user.tag} to SuperUser list`);
	}
}
