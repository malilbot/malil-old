import { Listener } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
const talkedRecently = new Set();
import Client from "../../Classes/Client";
import { superUsers } from "../../Lib/config";
import { exec } from "child_process";
import { main, sec, third, fourth } from "../../Lib/Utils";
import alexa from "alexa-bot-api";
const ai = new alexa();
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
				try {
					this.client.gp.math("commands", "+", 1);
					if (!message.content.startsWith("{")) return;
					const res = JSON.parse(message.content);
					const member = await this.client.users.fetch(res.user);
					const iq = Math.floor(Math.random() * 150) + 1;
					this.client.UserData.ensure(member.id, { iq: iq });
					if (!member) return this.client.logger.info("WHATTT?");
					this.client.logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));
					const wknd = res.isWeekend;
					const cur = Number(this.client.UserData.get(member.id, "iq"));
					if (!cur) return;
					const amount = wknd ? 2 : 1;
					this.client.UserData.set(member.id, cur + amount, "iq");
					message.channel.send(
						new MessageEmbed()
							.setAuthor(`vote from ${member.tag}`, member.avatarURL())
							.setDescription(`**${member} had ${cur || "Nothing"} iq now has ${cur + amount || "Nothing"} iq**`)
							.setTimestamp()
							.setColor(this.client.colors.blue)
					);
				} catch (e) {
					this.client.logger.info(e);
				}
			}
		}
		if (message?.guild?.id == "804143990869590066") {
			if (message.author.bot) return;
			if (message.content.toLowerCase().includes("remove") || message.content.toLowerCase().includes("close")) {
				if (message.content.toLowerCase().includes("pic") || message.content.toLowerCase().includes("image")) {
					message.reply(
						"To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen."
					);
				}
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
		if (message.content.includes("malil")) {
			if (!message.author.bot) {
				this.client.logger.info(`${main("[ MALIL MENTIONED ]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`);
			}
		}
		if (message.content.includes("tricked")) {
			if (!message.author.bot) {
				this.client.logger.info(`${main("[ MALIL MENTIONED ]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`);
			}
		}
		if (this.client.gp.get("shitpost").includes(message?.channel?.id)) {
			this.client.gp.math("commands", "+", 1);
			if (!message.author.bot) {
				if (!message.system) {
					if (!talkedRecently.has(message.author.id)) {
						if (message.content[0] !== "#") {
							let at: string;
							message?.attachments?.forEach((ata) => (at = ata.name));
							this.client.logger.info(`[ MSG ${message.author.tag} ] ${message.content}`);
							const reply = await ai.getReply(message.content || at || "OOOOGAAA BOOGA");
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
			if (message.author.bot) return;
			if (message.guild !== null) return;
			this.client.logger.info(`${main("[ DM ]")}${third("[AUTHOR]")} ${message.author.tag} (${message.author.id}) \x1b[32m[CONTENT]\x1b[34m ${message.content}`);
		}
	}
}
