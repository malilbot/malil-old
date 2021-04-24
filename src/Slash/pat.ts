import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";
import c from "centra";
import petPetGif from "pet-pet-gif";

export default class patCommand extends Command {
	constructor() {
		super("pat", {
			name: "pat",
			description: "pat someone",
			options: [
				{
					type: 6,
					name: "user",
					description: "user you want to be patted",
					required: false,
				},
				{
					type: 3,
					name: "ign",
					description: "in game name of th euser you want to have patted",
					required: false,
				},
				{
					type: 4,
					name: "speed",
					description: "The pat speed between 1 and 200",
					required: false,
				},
			],
		});
	}

	async exec(message: CommandInteraction) {
		let image: string;
		let speed: number = (message.options.find((i) => i.name == "speed").value as number) || 100;
		if (message.options.find((i) => i.name == "ign")) {
			const res = await (await c("https://api.mojang.com/users/profiles/minecraft/" + message.options[0].value, "GET").send()).json();
			if (res !== null) {
				image = `https://crafatar.com/renders/head/${res.id}?overlay`;
			} else {
				message.reply("User not found");
			}
		} else {
			let user = message.options[0]?.user || message.user;
			image = user.displayAvatarURL({ dynamic: false, format: "png" });
		}
		return message.reply({ content: "patting", files: [{ attachment: await petPetGif(image, { delay: speed | 20 }), name: `patted.gif` }] });
	}
}
