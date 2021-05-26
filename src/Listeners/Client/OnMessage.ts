import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import Client from "../../Classes/Client";
const talkedRecently = new Set();
import { MessageEmbed, MessageOptions } from "discord.js";
import { TextChannel } from "discord.js";
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
			const isDrm = message.guild.id == "804143990869590066";
			const isST = message.guild.id == "807302538558308352";
			const isDG = message.guild.id == "781913473872560189";
			if (!isDrm && !isST && !isDG) return;
			if (message.channel.id == "843599498394468393") {
				message
					.crosspost()
					.then(() => console.log("Crossposted message"))
					.catch((e) => {
						(message.guild.channels.cache.get("807328920935858214") as TextChannel).send("Couldnt publish the message in <#843599498394468393> e: \
					n" + e);
					});
			}
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

			const check = (e: string[], w?: string[]) => {
				if (!w) {
					return Check(e);
				}
				const i = Check(e);
				const k = Check(w);
				if (i && k) return true;
				else return false;
			};

			const sendm = async (i: MessageOptions | string): Promise<Message> => {
				this.client.logger.verbose(`${message.author.tag} [TRIGGERED] A AUTORESPONDER`);
				talkedRecently.add(message.author.id);
				return (await message.reply(i as MessageOptions)) as Message;
			};

			if (message.member.roles?.cache?.has("846102256738631691")) return console.log(`${message.author.tag} [TRIGGERED] AWAS STOPPED`);

			let smh: Message;
			if (check(["bann"]) && (isST || isDrm)) {
				smh = await sendm({
					files: ["http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png"],
					content: "The mod is not bannable and doesnt trigger watchdog.",
				});
			} else if (check(["bann"]) && isDG) {
				smh = await sendm({
					content:
						"This mod, like all others is use at your own risk. Even though it is *use at your own risk*, there have no reports of users being banned from the mod, and it should follow all of the current hypixel mod rules.",
				});
			} else if (check(["next", "change", "move", "close", "rid"], ["image", "pic"]) && isDrm) {
				smh = await sendm({
					content:
						"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen.",
				});
			} else if (check(["how", "get", "where"], ["sbp", "skyblockplus"]) && isDrm) {
				smh = await sendm({
					content:
						"https://discord.gg/2UjaFqfPwJ\n\n" +
						"**Download sbp from this server**\n" +
						"Skyblock plus, this mod is Dungeon Rooms Mod.\n" +
						"Again, in addition to the Dungeon Rooms Mod you downloaded from this server, you need to download **SkyBlockPlus** from Skyblock Personalized Discord server",
				});
			} else if (check(["location"]) && isST) {
				if (message.guild.id == "781913473872560189") return;

				smh = await sendm("Locations are a bit wack atm will be fixed\n" + "delete your gui scales file to fix it ( .minecraft/config/skytils/guipositions.json ) ");
			} else if (check(["send"], ["crash"])) {
				smh = await sendm({
					content: "Win key + R and then type %appdata%\\" + "\\.minecraft\\crash-reports\nmac: ~/Library/Application Support/minecraft\nLinux: You should know this if your using linux",
					files: ["https://cdn.discordapp.com/attachments/472601031839055873/837321036907282432/2021-04-29T13-29-47.mp4"],
				});
			} else if (check(["how", "where"], ["download", "mod"]) && (isST || isDG)) {
				if (message.guild.id == "781913473872560189") return;

				smh = await sendm("https://streamable.com/1rauw6");
			} else if (check(["open", "close", "skytils"], ["menu", "settings", "start"]) && isST) {
				if (message.guild.id == "781913473872560189") return;

				smh = await sendm("/st");
			} else if (check(["apply", "work"], ["griffin", "burrow"]) && isST) {
				if (message.guild.id == "781913473872560189") return;
				smh = await sendm(
					new MessageEmbed()
						.addField(
							"How to use griffin burrow waypoints",
							"1. Set your api key. Do /api new, click the message in chat then ctrl+a and ctrl+x to copy it, then do /skytils setkey and paste your key.\n" +
								"2. Enable griffin waypoints in events in /skytils\n" +
								"3. Leave the lobby you are in, and go to a new one to force the api to refresh.\n" +
								"4. Go click all the starting waypoints\n" +
								"5. Go to a new lobby or go to your island and back to hub\n" +
								"6. Click all the 2/4 waypoints and fight the mobs\n" +
								"7. Repeat steps 5-6"
						)
						.setColor(this.client.colors.green)
						.setFooter(message.guild.name, message.guild.iconURL())
						.setTimestamp()
				);
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
	}
}
