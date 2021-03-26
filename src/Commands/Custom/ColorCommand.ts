import { Command } from "discord-akairo";
import { Message, MessageCollector, TextChannel } from "discord.js";
import { EditGist, GetGist } from "../../lib/Utils";
import fetch from "node-fetch";
export default class ColorCommand extends Command {
	public constructor() {
		super("color", {
			aliases: ["color"],
			category: "Custom",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: null
				}
			],
			description: {
				content: "",
				usage: "color",
				example: ["color"]
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild"
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(message: Message, { args }) {
		/** some checks */
		if (message.guild.id !== "807302538558308352" && message.guild.id !== "755166643927122091") return;
		if (message.member.roles.cache.some((role) => role.name === "Server Booster")) {
			/** possible colors ig */
			const colors = ["dark_red", "red", "gold", "yellow", "dark_green", "green", "aqua", "dark_aqua", "dark_blue", "blue", "light_purple", "dark_purple"];

			const list = colors.toString().replace(/,/g, ", ").replace(/_/g, " ");

			if (args.toLowerCase()) args = args.toLowerCase();
			args = args.split(" ");

			/** Checking if the args are a valid color */
			if (!colors.includes(args[0])) return message.util.reply("you can only choose one of the following colors: " + list, { allowedMentions: { repliedUser: false } });

			/** getting the gist with my epic function */
			const res = await GetGist("6993d1f641ddcdb6ab2761a6ff8eb317", this.client);
			const input = JSON.parse(res.files["NameColors.json"].content);
			/** defining uuid already */
			let uuid;
			const channel = message.channel;
			/** asking for the ign */
			message.channel.send("Whats your ign?");
			const filter = (m) => m.author.id === message.author.id;
			/**
			 * collector stuff starts here
			 * */
			const collector = new MessageCollector(channel as TextChannel, filter, {
				max: 1,
				time: 1000 * 15
			});
			collector.on("end", (collected) => {
				collected.forEach(async (value) => {
					/** requesting sloth pixel cuz hypixel api sucks */
					const response = await fetch(`https://api.slothpixel.me/api/players/${value.content}`).then((resp) => resp.json());
					/** making sure the user exists */
					if (response.error || response.username == null) return message.reply("user does not exist");
					/** defining stuff */
					const name = response.username;
					uuid = response.uuid;
					const discord = response.links.DISCORD;
					/** comparing the user's discord tag */
					if (message.author.tag !== discord) return message.reply("Discord acount and minecraft acount a renot linked");
					message.channel.send("Aight got it " + name);
					input[uuid] = args[0];
					const txt = JSON.stringify(input);
					/**
					 * editing the gist with my epic function
					 * */
					await EditGist("NameColors.json", txt, "6993d1f641ddcdb6ab2761a6ff8eb317", this.client);
				});
			});
		} else if (message.member.roles.cache.some((role) => role.name === "DEV") || message.member.roles.cache.some((role) => role.name === "MOD")) {
			message.util.send("please note that you ar using this command as staff and no checks apply");
			if (!args) return message.util.send("not args provided");
			try {
				args = args.toLowerCase();
			} catch (e) {}

			/** Checking if the args are a valid color */

			/** getting the gist with my epic function */
			const res = await GetGist("6993d1f641ddcdb6ab2761a6ff8eb317", this.client);
			const input = JSON.parse(res.files["NameColors.json"].content);
			/** defining uuid already */
			let uuid;
			const channel = message.channel;
			/** asking for the ign */
			message.channel.send("Whats your ign?");
			const filter = (m) => m.author.id === message.author.id;
			/**
			 *
			 * collector stuff starts here
			 *
			 * */
			const collector = new MessageCollector(channel as TextChannel, filter, {
				max: 1,
				time: 1000 * 15
			});
			collector.on("end", (collected) => {
				collected.forEach(async (value) => {
					/** requesting sloth pixel cuz hypixel api sucks */
					const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${value.content}`).then((resp) => resp.json());
					/** making sure the user exists */
					if (response.name == null) return message.reply("user does not exist");
					/** defining stuff */
					const name = response.name;
					uuid = response.id;
					/** comparing the user's discord tag */
					message.channel.send("Aight got it gave " + name + " color " + args);
					input[uuid] = args;
					const txt = JSON.stringify(input);
					/**
					 * editing the gist with my epic function
					 * */
					await EditGist("NameColors.json", txt, "6993d1f641ddcdb6ab2761a6ff8eb317", this.client);
				});
			});
		} else {
			message.util.send("You need to be a booster to use this command in this server");
		}
	}
}
