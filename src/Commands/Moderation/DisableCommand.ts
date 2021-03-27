import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class DisableCommand extends Command {
	public constructor() {
		super("disable", {
			aliases: ["disable", "enable"],
			category: "Utility",
			description: {
				content: "A command to disable/enable commands.",
				usage: "disable|enable <command>",
				examples: ["disable ban", "enable ban"],
			},
			args: [
				{
					id: "cmd",
					type: "commandAlias",
					match: "content",
				},
				{
					id: "catagory",
					type: "string",
					match: "restContent",
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			userPermissions: ["MANAGE_GUILD"],
		});
	}
	public async exec(message: Message, { cmd, catagory }: { cmd: Command; catagory: string }): Promise<Message> {
		// typos are intentionally
		const catagoryList: string[] = [];
		let type: string;
		const db = this.client.gp;
		db.ensure("disabledCommands", {
			[message.guild.id]: [],
		});
		db.ensure("disabledCategory", {
			[message.guild.id]: [],
		});
		catagory = catagory[0].toUpperCase() + catagory.substring(1);
		if (!cmd && !catagory) return message.util.send("Please mention a command");
		if (cmd?.id == "disable") return await message.util.send(`You cannot disable ${cmd?.aliases[0]}.`);
		let action: string;
		const disabledCommands: string[] = (await db.get("disabledCommands", message.guild.id)) as string[];
		const disabledCatagorys: string[] = (await db.get("disabledCategory", message.guild.id)) as string[];
		for (const category of this.handler.categories.values()) {
			if (["default"].includes(category.id)) continue;
			catagoryList.push(category.id);
		}
		if (disabledCommands.includes(cmd?.id)) {
			disabledCommands.splice(disabledCommands.indexOf(cmd?.id), 1);
			db.set("disabledCommands", disabledCommands, message.guild.id);
			action = "enabled";
		} else if (disabledCatagorys.includes(catagory)) {
			disabledCatagorys.splice(disabledCatagorys.indexOf(catagory), 1);
			db.set("disabledCategory", disabledCatagorys, message.guild.id);
			action = "enabled";
			type = "catagory";
		} else if (cmd?.id) {
			disabledCommands.push(cmd?.id);
			db.set("disabledCommands", disabledCommands, message.guild.id);
			action = "disabled";
		} else if (catagoryList.includes(catagory)) {
			disabledCatagorys.push(catagory);
			db.set("disabledCategory", disabledCatagorys, message.guild.id);
			action = "disabled";
			type = "catagory";
		} else {
			return message.util.send("Thats not a category or a command");
		}
		if (type == "catagory") {
			return await message.util.send(`${action} category **${catagory}**`);
		}
		return await message.util.send(`${action} command **${cmd?.aliases[0]}**`);
	}
}
