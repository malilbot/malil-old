import type { Message, MessageOptions, TextChannel } from "discord.js";
import { InterfaceClient } from "./Utils";
const talkedRecently = new Set();
export = async (message: Message) => {
	if (message.author.id == "510016054391734273")
		if (message.channel.id == "831744864001064971")
			if (message.content.includes("RUINED IT AT")) {
				await message.mentions.members.first().roles.add("838949553020993557");
				setTimeout(() => {
					if (message.mentions.members.first().roles.cache.has("838949553020993557")) message.mentions.members.first().roles.remove("838949553020993557");
				}, 600000);
				message.channel.send("bald");
				const channel = await message.client.channels.fetch("832315100274622495");
				(channel as TextChannel).send(message.content);
			}
	if (message.author.bot) return;
	if (!talkedRecently.has(message.author.id)) {
		if (message.content == "!math") {
			function makeid(length) {
				var result = [];
				var characters = "ABCDEFGH^JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				var charactersLength = characters.length;
				for (var i = 0; i < length; i++) {
					result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
				}
				return result.join("");
			}

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
		if (message.channel.id == "807702096064937990") return;

		const check = (i: string | string[]) => {
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
		let smh: Message;
		const sendm = async (i: MessageOptions): Promise<Message> => {
			(message.client as InterfaceClient).logger.verbose(`${message.author.tag} [TRIGGERED] A AUTORESPONDER`);
			talkedRecently.add(message.author.id);
			return (await message.reply(i)) as Message;
		};

		if (check("bann")) {
			smh = await sendm({
				files: ["http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png"],
				content: "The mod is not bannable and doesnt trigger watchdog.",
			});
		} else if (check(["send"]) && check(["crash"])) {
			smh = await sendm({
				content: "Win key + R and then type %appdata%\\" + "\\.minecraft\\crash-reports\nmac: ~/Library/Application Support/minecraft\nLinux: You should know this if your using linux",
				files: ["https://cdn.discordapp.com/attachments/472601031839055873/837321036907282432/2021-04-29T13-29-47.mp4"],
			});
		} else if (check(["next", "change", "move", "close", "rid"]) && check(["image", "pic"])) {
			smh = await sendm({
				content:
					"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen.",
			});
		} else if (check(["how", "get", "where"]) && check(["sbp", "skyblockplus"])) {
			smh = await sendm({
				content:
					"https://discord.gg/2UjaFqfPwJ\n\n" +
					"**Download sbp from this server**\n" +
					"Skyblock plus, this mod is Dungeon Rooms Mod.\n" +
					"Again, in addition to the Dungeon Rooms Mod you downloaded from this server, you need to download **SkyBlockPlus** from Skyblock Personalized Discord server",
			});
		} else return;

		await smh.react("❌");
		smh.awaitReactions((reaction) => reaction.emoji.name === "❌", { max: 1, time: 60000 /** 60 seconds */ }).then((collected) => {
			if (!collected.first()) return;
			if (collected.first()) {
				smh.delete();
			}
		});

		setTimeout(() => {
			talkedRecently.delete(message.author.id);
		}, 60000); //60 seconds
	}
};
