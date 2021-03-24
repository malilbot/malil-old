import { Listener } from "discord-akairo";
import { Message } from "discord.js";
const talkedRecently = new Set();
import Client from "../../lib/Client";
import { superUsers } from "../../lib/config";
import { main, sec, third, fourth, a1, split } from "../../lib/Utils";
import alexa from "alexa-bot-api";
const ai = new alexa();
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

	async exec(message: Message) {
		if (message.channel.id == "823935750168117312") {
			if (message.webhookID) {
				try {
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
					message.channel.send(`Vote Counted ${member.tag}, ${member.id}\nEarned ${amount} iq point(s) while voting`);
				} catch (e) {
					this.client.logger.info(e);
				}
			}
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
