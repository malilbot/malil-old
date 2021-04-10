import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class leaveguildCommand extends Command {
	public constructor() {
		super("leaveguild", {
			aliases: ["leaveguild"],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "leave a guild",
				usage: "leaveguild",
				example: ["leaveguild"],
			},
			ratelimit: 3,
			channel: "guild",
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }): Promise<void> {
		const guild = this.client.guilds.cache.get(args);
		await guild.leave().catch((e) => message.util.send("a error occured trying to leave that guild"));
		message.util.send({
			embed: new MessageEmbed()
				.setTitle("guild left")
				.setDescription("left the guild named " + guild.name)
				.addField("users", guild.members.cache.filter((member) => !member.user.bot).size),
			allowedMentions: { repliedUser: false },
		});
	}
}
