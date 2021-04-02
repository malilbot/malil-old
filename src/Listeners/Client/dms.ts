import { Listener } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
const talkedRecently = new Set();
import Client from "../../lib/Client";
import { superUsers } from "../../lib/config";
import { Logger } from "winston";
import { exec } from "child_process";
import { main, sec, third, fourth, a1, split } from "../../lib/Utils";
import alexa from "alexa-bot-api";
const ai = new alexa();
let spokenusers = [];
export default class message extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("message", {
			emitter: "client",
			event: "message",
			category: "client",
		});
		this.client = client;
	}

	async exec(message: Message): Promise<void | Logger> {
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
		if (message.channel.id == "818158216156413973") {
			exec("git pull", async (e, stdout) => {
				if (!stdout.includes("Already up to date.")) {
					this.client.logger.verbose("[ PULLING NEW COMMIT ]");
					message.channel.send(new MessageEmbed().setColor(this.client.colors.green).addField("Fetching the new commit <:github:824673035499733022>", "Restarting this might take a while"));
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
							this.client.logger.info(`[ MSG ${message.author.tag} ] ${message.content}`);
							const reply = await ai.getReply(message.content || "OOOOGAAA BOOGA");
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
