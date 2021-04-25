import { Listener } from "discord-akairo";
import { Message, MessageEmbed, TextChannel } from "discord.js";
const talkedRecently = new Set();
import Client from "../../Classes/Client";
import { superUsers } from "../../Lib/config";
import { exec } from "child_process";
import { main, sec, third, fourth } from "../../Lib/Utils";
import Centra from "centra";
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
		if (message.author.bot) return;
		if (message?.guild?.id == "807302538558308352") {
			if (!talkedRecently.has(message.author.id)) {
				const content = message.content.toLowerCase();
				/**
				 *
				 * bannable
				 *
				 */
				if (content.includes("bann")) {
					talkedRecently.add(message.author.id);
					message.reply({ files: ["http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png"], content: "The mod is not bannable and doesnt trigger watchdog." });
					/**
					 *
					 * photo
					 *
					 */
				} else if (content.includes("waypoint") || content.includes("burrow")) {
					if (content.includes("broken") || content.includes("slow") || content.includes("not") || content.includes("work")) {
						talkedRecently.add(message.author.id);
						message.reply({
							files: ["https://media.discordapp.net/attachments/807302538558308355/831174229277016094/eeeeeeee.png?width=300&height=300"],
							content: "<#807303575549116417>",
						});
					}
				} else if (content.includes("skytils") || content.includes("st")) {
					if (content.includes("menu") || content.includes("open") || content.includes("settings") || content.includes("start")) {
						talkedRecently.add(message.author.id);
						message.reply({
							content: "/st",
						});
					}
				} else if (content.includes("open") || content.includes("close")) {
					if (content.includes("menu") || content.includes("settings")) {
						talkedRecently.add(message.author.id);
						message.reply({
							content: "/st",
						});
					}
				} else if (content.includes("how")) {
					if (content.includes("install") || content.includes("location") || content.includes("move") || content.includes("edit")) {
						talkedRecently.add(message.author.id);
						message.reply({ files: ["https://media.discordapp.net/attachments/807302538558308355/831174229277016094/eeeeeeee.png?width=300&height=300"] });
					}
					/**
					 *
					 * griffin
					 *
					 */
				} else if (content.includes("apply") || content.includes("work")) {
					if (content.includes("griffin") || content.includes("burrow")) {
						talkedRecently.add(message.author.id);
						message.reply(
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
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 10000); //10 seconds
			}
		} else if (message?.guild?.id == "804143990869590066") {
			const content = message.content.toLowerCase();
			if (message.author.id == "510016054391734273") {
				if (message.channel.id == "831744864001064971") {
					if (message.content.includes("RUINED IT AT")) {
						const channel = await this.client.channels.fetch("832315100274622495");
						(channel as TextChannel).send(message.content);
					}
				}
			}

			if (!talkedRecently.has(message.author.id)) {
				if (content.includes("next") || content.includes("change")) {
					if (content.includes("secret")) {
						talkedRecently.add(message.author.id); // Add the user to a blacklist to prevent the bot from being spammed
						message.reply(`Default is B for previous, N for next, and M to clear, **note** these keybinds can also be used by other mods so make sure they are bound correctly.`);
					}
				} else if (content.includes("bannable") && content.includes("this")) {
					talkedRecently.add(message.author.id);
					message.reply("The mod is not bannable and doesnt trigger watchdog.");
				} else if (content.includes("remove") || content.includes("close") || content.includes("rid") || content.includes("rid")) {
					if (content.includes("pic") || content.includes("image")) {
						talkedRecently.add(message.author.id);
						message.reply(
							"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen."
						);
					}
				}
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 10000); //10 seconds
			}
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
					}, 2000);
				}
			}
		}
	}
}
