import Command from "../../Classes/malilCommand";
import type { Message } from "discord.js";
export default class EnSlashCommand extends Command {
	constructor() {
		super("EnSlash", {
			aliases: ["EnSlash"],
			category: "Developer",
			quoted: true,

			description: {
				content: "Enabled slash command in the guild cant be reversed!!!",
				usage: "EnSlash",
				example: ["EnSlash"],
			},
			args: [
				{
					id: "del",
					type: "boolean",
					match: "flag",
					flag: ["--delete", "-d"],
				},
				{
					id: "global",
					type: "boolean",
					match: "flag",
					flag: ["--global", "-g"],
				},
			],
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true,
		});
	}

	async exec(message: Message, args) {
		const del = args.del;
		const global = args.global;
		try {
			if (del) {
				if (global) {
					const enabled = await this.client.application.commands.fetch();
					for (const command of enabled) {
						await this.client.application.commands.delete(command[1].id);
					}
				} else {
					const enabled = await message.guild.commands.fetch();
					for (const command of enabled) {
						await message.guild.commands.delete(command[1].id);
					}
				}
			} else {
				if (global) {
					const enabled = await this.client.application.commands.fetch();
					for (const command of enabled) {
						if (!this.handler.modules.find((cmd) => cmd.id == command[1].name)) {
							await this.client.application.commands.delete(command[1].id);
							console.log("deleted", command[1].name);
						}
					}

					for (let cmd of this.handler.modules) {
						if (cmd[1].execSlash) {
							const found = enabled.find((i) => i.name == cmd[1].id);

							const slashdata = {
								name: cmd[1].id,
								description: cmd[1].description.content,
								options: cmd[1].options.options,
							};

							if (found?.id) {
								if (slashdata.description !== found.description) {
									this.client.application.commands.edit(found.id, slashdata);
								}
							} else {
								console.log("enabled", cmd[1].id);
								this.client.application.commands.create(slashdata);
							}
						}
					}
				} else {
					const enabled = await message.guild.commands.fetch();
					for (const command of enabled) {
						if (!this.handler.modules.find((cmd) => cmd.id == command[1].name)) {
							await message.guild.commands.delete(command[1].id);
							console.log("deleted", command[1].name);
						}
					}

					for (let cmd of this.handler.modules) {
						if (cmd[1].execSlash) {
							const found = enabled.find((i) => i.name == cmd[1].id);

							const slashdata = {
								name: cmd[1].id,
								description: cmd[1].description.content,
								options: cmd[1].options.options,
							};

							if (found?.id) {
								if (slashdata.description !== found.description) {
									message.guild.commands.edit(found.id, slashdata);
								}
							} else {
								console.log("enabled", cmd[1].id);
								message.guild.commands.create(slashdata);
							}
						}
					}
				}
			}

			return message.reply(":ok_hand:");
		} catch (e) {
			console.log(e);
			return message.reply(
				`This server hasnt added the slash command permission to me yet\n` +
					`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=117824&scope=bot%20applications.commands`
			);
		}
	}
}
