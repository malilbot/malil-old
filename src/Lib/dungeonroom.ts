import type { Message } from "discord.js";
const talkedRecently = new Set();
export = async (message: Message) => {
	if (!talkedRecently.has(message.author.id)) {
		const check = (i: string) =>
			message.content
				.toLowerCase()
				.replace(/[^a-z0-9]+|\s+/gim, "")
				.includes(i);

		let smh: Message;
		if (check("bannable") && check("this")) {
			talkedRecently.add(message.author.id);
			smh = await message.reply("The mod is not bannable and doesnt trigger watchdog.");
		} else if (check("remove") || check("close") || check("rid") || check("next") || check("change")) {
			if (check("pic") || check("image") || check("secret")) {
				talkedRecently.add(message.author.id);
				smh = await message.reply(
					"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen."
				);
			}
		} else return;

		if (smh) {
			const filter = (reaction) => {
				return reaction.emoji.name === "❌";
			};
			await smh.react("❌");
			smh.awaitReactions(filter, { max: 1, time: 60000 /** 60 seconds */ }).then((collected) => {
				if (!collected.first()) return;
				if (collected.first()) {
					smh.delete();
				}
			});
		}

		setTimeout(() => {
			talkedRecently.delete(message.author.id);
		}, 60000); //60 seconds
	}
};
