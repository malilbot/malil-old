import Command from "../../Classes/malilCommand";
import { Message, TextChannel } from "discord.js";

export default class ShitPostCommand extends Command {
	constructor() {
		super("shitPost", {
			aliases: ["shitPost"],
			category: "Custom",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "NO",
				example: "NO",
			},
			superUserOnly: true,
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async exec(message: Message, { args }) {
		if (!args) {
			let list = "";
			const arr = this.client.gp.get("shitpost");
			await arr.forEach(async (item: string) => {
				const name = (await this.client.channels.fetch(item)) as TextChannel;

				list += `${name.name}: ${name.id}\n`;
			});

			return message.reply(list || "nothing......");
		}
		args = args.replace(/</, "").replace(/>/, "").replace(/#/, "");
		const name = ((await this.client.channels.fetch(args)) as TextChannel).name;
		if (this.client.gp.get("shitpost").includes(args)) {
			const arr = this.client.gp.get("shitpost");
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == args) {
					arr.splice(i, 1);
				}
			}

			this.client.gp.set("shitpost", arr);
			return message.reply(`Removed ${name} from shitpost list`);
		}

		this.client.gp.push("shitpost", args);
		message.reply(`Added ${name} to shitpost list`);
	}
}
