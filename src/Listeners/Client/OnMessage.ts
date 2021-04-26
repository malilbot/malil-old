import { Listener } from "discord-akairo";
import { Message, MessageEmbed, ShardingManager, TextChannel } from "discord.js";
const talkedRecently = new Set();
import Client from "../../Classes/Client";
import { superUsers } from "../../Lib/config";
import { exec } from "child_process";
import { main, sec, third, fourth } from "../../Lib/Utils";
import Centra from "centra";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "node:constants";
export default class message extends Listener {
	public constructor(client: Client) {
		super("message", {
			emitter: "client",
			event: "message",
			category: "client",
		});
		this.client = client;
	}

	async exec(message: Message): Promise<void> {
		if (message.channel.id == "823935750168117312") {
			if (message.webhookID) {
				this.client.gp.math("commands", "+", 1);
				if (!message.content.startsWith("{")) return;

				const res = JSON.parse(message.content);
				const member = await this.client.users.fetch(res.user);

				const cur = Number(this.client.userdata.ensure(member.id, Math.floor(Math.random() * 150) + 1, "iq"));
				const votes = Number(this.client.userdata.ensure(member.id, 1, "votes"));
				this.client.userdata.set(member.id, votes + 1, "votes");
				if (!member) return this.client.logger.info("WHATTT?");

				this.client.logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));

				const wknd = res.isWeekend;

				const amount = wknd ? 2 : 1;

				this.client.userdata.set(member.id, cur + amount, "iq");

				message.channel.send(
					this.client.util
						.embed()
						.setAuthor(`vote from ${member.tag}`, member.avatarURL())
						.setDescription(`**${member} had ${cur || "Nothing"} iq now has ${cur + amount || "Nothing"} iq**`)
						.setTimestamp()
						.setColor(this.client.colors.blue)
				);
			}
		}

		if (message.channel.id == "818158216156413973") {
			exec("git pull", async (e, stdout) => {
				if (!stdout.includes("Already up to date.")) {
					this.client.logger.verbose("[ PULLING NEW COMMIT ]");
					message.react("824673035499733022");
					exec("yarn rm", () => {
						exec("npx tsc", async () => {
							this.client.logger.verbose("[ RESTARTING ]");
							this.client.shard.respawnAll();
						});
					});
				}
			});
		}
		if (message.author.id == "510016054391734273")
			if (message.channel.id == "831744864001064971")
				if (message.content.includes("RUINED IT AT")) {
					message.channel.send("bald");
					const channel = await this.client.channels.fetch("832315100274622495");
					(channel as TextChannel).send(message.content);
				}

		const check = (i: string) =>
			message.content
				.toLowerCase()
				.replace(/[^a-z0-9]+|\s+/gim, "")
				.includes(i);
		if (message.author.bot) return; //MALIL SHALL NOT SPAM CHAT TALKING TO HIMSELF
		if (!talkedRecently.has(message.author.id)) {
			if (message?.guild?.id == "807302538558308352") {
				if (message.channel.id == "807702096064937990") return;
				let smh: Message;
				if (check("bann")) {
					//skytils

					/**
					 *
					 * bannable
					 *
					 */
					talkedRecently.add(message.author.id);
					message.reply({ files: ["http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png"], content: "The mod is not bannable and doesnt trigger watchdog." });
					/**
					 *
					 * photo
					 *
					 */
				} else if (check("waypoint") || check("burrow")) {
					if (check("broken") || check("slow") || check("not") || check("work")) {
						talkedRecently.add(message.author.id);
						smh = await message.reply({
							files: ["https://media.discordapp.net/attachments/807302538558308355/831174229277016094/eeeeeeee.png?width=300&height=300"],
							content: "<#807303575549116417>",
						});
					}
				} else if (check("location")) {
					smh = await message.reply("Locations are a bit wack atm will be fixed\n" + "delete your gui scales file to fix it ( .minecraft/config/ ) ");
				} else if (check("skytils")) {
					if (check("menu") || check("open") || check("settings") || check("start")) {
						talkedRecently.add(message.author.id);
						smh = await message.reply({
							content: "/st",
						});
					}
				} else if (check("open") || check("close")) {
					if (check("menu") || check("settings")) {
						talkedRecently.add(message.author.id);
						smh = await message.reply({
							content: "/st",
						});
					}
				} else if (check("how")) {
					if (check("install") || check("location") || check("move") || check("edit")) {
						talkedRecently.add(message.author.id);
						smh = await message.reply({ files: ["https://media.discordapp.net/attachments/807302538558308355/831174229277016094/eeeeeeee.png?width=300&height=300"] });
					}
					/**
					 *
					 * griffin
					 *
					 */
				} else if (check("apply") || check("work")) {
					if (check("griffin") || check("burrow")) {
						talkedRecently.add(message.author.id);
						smh = await message.reply(
							this.client.util
								.embed()
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
					}
				}
				if (smh?.author) {
					const filter = (reaction, user) => {
						return reaction.emoji.name === "❌" && user.id === message.author.id;
					};
					await smh.react("❌");
					smh.awaitReactions(filter, { max: 1, time: 60000 /** 60 seconds */ }).then((collected) => {
						if (!collected.first()) return;
						if (collected.first()) {
							smh.delete();
						}
					});
				}
			} else if (message?.guild?.id == "804143990869590066") {
				// drm

				if (check("bannable") && check("this")) {
					talkedRecently.add(message.author.id);
					message.reply("The mod is not bannable and doesnt trigger watchdog.");
				} else if (check("remove") || check("close") || check("rid") || check("next") || check("change")) {
					if (check("pic") || check("image") || check("secret")) {
						talkedRecently.add(message.author.id);
						message.reply(
							"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen."
						);
					}
				}
			}
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 60000); //60 seconds
		}

		if (this.client.gp.ensure("shitpost", []).includes(message?.channel?.id)) {
			this.client.gp.math("commands", "+", 1);

			if (!message.system) {
				if (!talkedRecently.has(message.author.id)) {
					if (message.content[0] !== "#") {
						let at: string;
						message?.attachments?.forEach((ata) => (at = ata.name));
						this.client.logger.info(`[ MSG ${message.author.tag} ] ${message.content}`);
						const question = message.content.replace(/ /gim, "%20");
						const reply = (await (await Centra(`https://alexa-bot-api-web-server.vercel.app/api/alexa?stimulus=${question}`).send()).json()).reply;
						//const reply = await ai.getReply(message.content || at || "OOOOGAAA BOOGA");
						this.client.logger.info(`[ ${message.guild.name} ][ REPLY ] ${reply}`);
						message.reply(reply, { allowedMentions: { repliedUser: false } });
					}
					if (superUsers.includes(message.author.id)) return;
					talkedRecently.add(message.author.id);
					setTimeout(() => {
						talkedRecently.delete(message.author.id);
					}, 2000); //2 seconds
				}
			}
		}
	}
}
