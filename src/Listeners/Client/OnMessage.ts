import { Listener } from "discord-akairo";
import { Message, MessageEmbed, ShardingManager, TextChannel } from "discord.js";
const talkedRecently = new Set();
import Client from "../../Classes/Client";
import { superUsers } from "../../Lib/config";
import { exec } from "child_process";
import { main, sec, third, fourth } from "../../Lib/Utils";
import skytils from "../../Lib/skytils";
import drm from "../../Lib/dungeonroom";
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
		if (message?.channel?.id == "823935750168117312") {
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

		if (message?.channel?.id == "818158216156413973") {
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

		if (message?.author.bot) return; //MALIL SHALL NOT SPAM CHAT TALKING TO HIMSELF

		if (message?.guild?.id == "748956745409232945") {
			skytils(message);
		} else if (message?.guild?.id == "804143990869590066") {
			drm(message);
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
						const reply = await (await (await Centra(`https://alexa-bot-api-web-server.vercel.app/api/alexa?stimulus=${question || at || "OOOOGAAA BOOGA"}`).send()).json()).reply;
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
