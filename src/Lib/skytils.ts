// import type { Message, MessageOptions } from "discord.js";
// const talkedRecently = new Set();
// import { consts } from "./Utils";
// import { MessageEmbed } from "discord.js";
// import { TextChannel } from "discord.js";
// export = async (message: Message) => {
// 	if (!talkedRecently.has(message.author.id)) {
// 		if (message.channel.id == "843599498394468393") {
// 			message
// 				.crosspost()
// 				.then(() => console.log("Crossposted message"))
// 				.catch((e) => {
// 					(message.guild.channels.cache.get("807328920935858214") as TextChannel).send("Couldnt publish the message in <#843599498394468393> e: \
// 					n" + e);
// 				});
// 		}
// 		if (message.channel.id == "807702096064937990") return;

// 		const check = (i: string | string[]) => {
// 			const ls = (m: string) =>
// 				message.content
// 					.toLowerCase()
// 					.replace(/[^a-z0-9]+|\s+/gim, "")
// 					.includes(m);
// 			if (typeof i == "string") {
// 				return ls(i);
// 			} else if (typeof i == "object") {
// 				for (const str of i) {
// 					if (ls(str)) {
// 						return true;
// 					} else {
// 						continue;
// 					}
// 				}
// 			}
// 		};
// 		const sendm = async (i: MessageOptions | string): Promise<Message> => {
// 			(message.client as any).logger.verbose(`${message.author.tag} [TRIGGERED] A AUTORESPONDER`);
// 			talkedRecently.add(message.author.id);
// 			return (await message.reply(i as MessageOptions)) as Message;
// 		};

// 		if (message.author.bot) return;
// 		if (message.member.roles?.cache?.has("846102256738631691")) return console.log(`${message.author.tag} [TRIGGERED] AWAS STOPPED`);
// 		let smh: Message;
// 		if (check("bann") && isST || isDrm) {
// 			smh = await sendm({
// 				files: ["http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png"],
// 				content: "The mod is not bannable and doesnt trigger watchdog.",
// 			});
// 		} else if (check("location")) {
// 			if (message.guild.id == "781913473872560189") return;

// 			smh = await sendm("Locations are a bit wack atm will be fixed\n" + "delete your gui scales file to fix it ( .minecraft/config/skytils/guipositions.json ) ");
// 		} else if (check(["send"]) && check(["crash"])) {
// 			smh = await sendm({
// 				content: "Win key + R and then type %appdata%\\" + "\\.minecraft\\crash-reports\nmac: ~/Library/Application Support/minecraft\nLinux: You should know this if your using linux",
// 				files: ["https://cdn.discordapp.com/attachments/472601031839055873/837321036907282432/2021-04-29T13-29-47.mp4"],
// 			});
// 		} else if (check(["how", "where"]) && check(["download", "mod"])) {
// 			if (message.guild.id == "781913473872560189") return;

// 			smh = await sendm("https://streamable.com/1rauw6");
// 		} else if (check(["open", "close", "skytils"]) && check(["menu", "settings", "start"])) {
// 			if (message.guild.id == "781913473872560189") return;

// 			smh = await sendm("/st");
// 		} else if (check(["apply", "work"]) && check(["griffin", "burrow"])) {
// 			if (message.guild.id == "781913473872560189") return;
// 			smh = await sendm(
// 				new MessageEmbed()
// 					.addField(
// 						"How to use griffin burrow waypoints",
// 						"1. Set your api key. Do /api new, click the message in chat then ctrl+a and ctrl+x to copy it, then do /skytils setkey and paste your key.\n" +
// 							"2. Enable griffin waypoints in events in /skytils\n" +
// 							"3. Leave the lobby you are in, and go to a new one to force the api to refresh.\n" +
// 							"4. Go click all the starting waypoints\n" +
// 							"5. Go to a new lobby or go to your island and back to hub\n" +
// 							"6. Click all the 2/4 waypoints and fight the mobs\n" +
// 							"7. Repeat steps 5-6"
// 					)
// 					.setColor(consts.colors.green)
// 					.setFooter(message.guild.name, message.guild.iconURL())
// 					.setTimestamp()
// 			);
// 		} else return;

// 		await smh.react("❌");
// 		smh.awaitReactions((reaction) => reaction.emoji.name === "❌", { max: 1, time: 60000 /** 60 seconds */ }).then((collected) => {
// 			if (!collected.first()) return;
// 			if (collected.first()) {
// 				smh.delete();
// 			}
// 		});

// 		setTimeout(() => {
// 			talkedRecently.delete(message.author.id);
// 		}, 60000); //60 seconds
// 	}
// };
