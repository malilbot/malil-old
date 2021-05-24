import { Message, CommandInteraction } from "discord.js";
const lan = {
	en: 1,
	owo: 2,
};
import en from "../translation/en";
import owo from "../translation/owo";
import Client from "./Client";
export default class translation {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}
	async get(message: Message, thing: string, ...args: string[]): Promise<Message> {
		const language = (await this.client.db.getGuildSettings(message.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return message.channel.send({ content: translation });
	}
	async iget(interaction: CommandInteraction, thing: string, ...args: string[]): Promise<void> {
		const language = (await this.client.db.getGuildSettings(interaction.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return interaction.reply({ content: translation });
	}
	async sget(interaction: CommandInteraction | Message, thing: string, ...args: string[]): Promise<string> {
		const language = (await this.client.db.getGuildSettings(interaction.guild.id)).language || lan.en;
		let translation: string | fn;
		if (language == 1) {
			translation = en[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		} else if (language == 2) {
			translation = owo[thing];
			if (!translation) throw new Error("NO TRANSLATION FOR " + thing);
			if (typeof translation == "function") {
				translation = translation(...args);
			}
		}
		return <string>translation;
	}
	async getObject(message: Message, things): Promise<any> {
		const language = (await this.client.db.getGuildSettings(message.guild.id)).language || lan.en;
		console.log(language);

		const returnData = {};
		if (language == 1) {
			for (const key in things) {
				let translation = en[key];
				if (typeof translation == "function") {
					translation = translation(...things[key]);
				}
				returnData[key] = translation;
			}
		} else if (language == 2) {
			console.log("OWO");
			for (const key in things) {
				let translation = owo[key];
				console.log(translation);
				if (typeof translation == "function") {
					translation = translation(...things[key]);
				}
				returnData[key] = translation;
			}
		}
		return returnData;
	}
}
interface fn {
	(...args: string[]): string;
}
