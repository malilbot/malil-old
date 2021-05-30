import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import Client from "../../Classes/Client";
const talkedRecently = new Set();
import { TextChannel } from "discord.js";
import responses from "../../responses";

export default class message extends Listener {
	constructor(client: Client) {
		super("message", {
			emitter: "client",
			event: "message",
			category: "client",
		});
		this.client = client;
	}

	async exec(message: Message): Promise<void> {
		if (!message?.guild?.id) return;
		if (message.channel.id == "843599498394468393") {
			message
				.crosspost()
				.then(() => console.log("Crossposted message"))
				.catch((e) => {
					(message.guild.channels.cache.get("807328920935858214") as TextChannel).send("Couldnt publish the message in <#843599498394468393> e: \n" + e);
				});
		}
		if (message.webhookID) return;
		if (message.system) return;
		if (message.author.id == "510016054391734273")
			if (message.channel.id == "831744864001064971")
				if (message.content.includes("RUINED IT AT")) {
					await message.mentions.members.first().roles.add("838949553020993557");
					message.channel.send("bald");
					const channel = await message.client.channels.fetch("832315100274622495");
					(channel as TextChannel).send(message.content);
				}
		if (message.content == "!math") {
			const makeid = (length: number) => {
				const result = [];
				const characters = "ABCDEFGH^JKLMNOPQRSTUVWXY;Zabcdefghijklmnopqrstuvwxyz01&23456789";
				const charactersLength = characters.length;
				for (let i = 0; i < length; i++) {
					result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
				}
				return result.join("");
			};

			const str = makeid(10);
			message.reply("Please repeat " + str.split("").join("​"));
			const filter = (m) => message.author.id === m.author.id;

			message.channel
				.awaitMessages(filter, { time: 10000, max: 1, errors: ["time"] })
				.then((messages) => {
					if (messages.first().content == str) {
						if (message.member.roles.cache.has("838949553020993557")) message.member.roles.remove("838949553020993557");
						//835035147824136202
						const c = Number((Math.random() * 10).toFixed(3)),
							d = Number((Math.random() * 10).toFixed(3)),
							a = c + d;
						message.reply(`Now answer the real math question ${c} * ${d}`.split("").join("​"));
						message.channel
							.awaitMessages(filter, { time: 10000, max: 1, errors: ["time"] })
							.then((messages) => {
								if (messages.first().content == a.toString()) {
									if (message.member.roles.cache.has("838949553020993557")) message.member.roles.remove("838949553020993557");
									message.reply("Correct your role has been removed And can math has been added");
									if (!message.member.roles.cache.has("835035147824136202")) message.member.roles.add("835035147824136202");
									return;
								} else {
									message.channel.send(`\`${messages.first().content}\` !== ` + a);
								}
							})
							.catch(() => {
								message.channel.send("You werent fast enough try again!");
							});
					} else {
						message.channel.send(`\`${messages.first().content}\` !== ` + str);
					}
				})
				.catch(() => {
					message.channel.send("You werent fast enough try again!");
				});
		}
		if (!talkedRecently.has(message.author.id)) {
			const isDrm = message?.guild?.id == "804143990869590066";
			const isST = message?.guild?.id == "807302538558308352";
			const isDG = message?.guild?.id == "781913473872560189";
			const isTS = message?.guild?.id == "748956745409232945";
			if (!isDrm && !isST && !isDG && !isTS) return;

			if (message.author.bot) return;
			const Check = (i: string | string[]) => {
				const ls = (m: string) =>
					message.content
						.toLowerCase()
						.replace(/[^a-z0-9]+|\s+/gim, "")
						.includes(m);
				if (typeof i == "string") {
					return ls(i);
				} else if (typeof i == "object") {
					for (const str of i) {
						if (ls(str)) {
							return true;
						} else {
							continue;
						}
					}
				}
			};

			const check = (e?: string[], w?: string[]) => {
				if (!w) {
					return Check(e);
				}
				const i = Check(e);
				const k = Check(w);
				if (i && k) return true;
				else return false;
			};

			if (message.member.roles?.cache?.has("846102256738631691")) return console.log(`${message.author.tag} [TRIGGERED] AWAS STOPPED`);
			responses.forEach(async (h) => {
				if (h.guilds.includes(message.guild.id)) {
					if (check(...h.triggers)) {
						if (!talkedRecently.has(message.author.id)) {
							this.client.logger.verbose(`${message.author.tag} [TRIGGERED] A AUTORESPONDER`);
							talkedRecently.add(message.author.id);
							const msg = await message.reply({ content: h.message.content, files: h.message.files, allowedMentions: { repliedUser: true } }).catch();
							await msg.react("❌");
							msg.awaitReactions((reaction) => reaction.emoji.name === "❌", { max: 1, time: 60000 /** 60 seconds */ }).then((collected) => {
								if (!collected.first()) return;
								if (collected.first()) {
									msg.delete();
								}
							});

							setTimeout(() => {
								talkedRecently.delete(message.author.id);
							}, 60000); //60 seconds
						}
					}
				}
			});
		}
	}
}
