import { Listener } from "discord-akairo";
import { GuildMember, TextChannel, MessageEmbed } from "discord.js";
import Client from "../../lib/Client";
import { main, sec, fourth, a1 } from "../../lib/Utils";
export default class WelcomeEmbed extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("welcomeEmbed", {
			emitter: "client",
			event: "guildMemberAdd",
			category: "client"
		});
		this.client = client;
	}

	async exec(member: GuildMember): Promise<void> {
		if (this.client.mutes.get(member.guild.id) && this.client.mutes.get(member.guild.id, "mutes") && this.client.mutes.get(member.guild.id, "role")) {
			const mutes = this.client.mutes.get(member.guild.id, "mutes");
			if (mutes[member.id]) {
				if (Date.now() < mutes[member.id]) {
					const role = member.guild.roles.cache.get(this.client.mutes.get(member.guild.id, "role")) || (await member.guild.roles.fetch(this.client.mutes.get(member.guild.id, "role")));
					member.roles.add(role, "L eft and rejoined while muted");
				}
			}
		}
		if (this.client.settings.dev == false) {
			if (member.guild.id == "748956745409232945") {
				let gifs = [
					"https://i.imgur.com/MqGBqZs.gif",
					"https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
					"https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif",
					"https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif"
				];
				gifs = shuffle(gifs);
				const welcomeEmbed = new MessageEmbed()
					.setColor(this.client.consts.colors.green)
					.addField("Welcome " + member.user.tag, "hope you enjoy the stay")
					.setImage(gifs[Math.floor(Math.random() * gifs.length)]);
				const channel = await this.client.channels.fetch("748970525245702174");
				const role = await member.guild.roles.fetch("748967146498818058");
				member.roles.add(role);
				const webhook = await (channel as TextChannel).createWebhook(member.user.tag).then((webhook) =>
					webhook.edit({
						avatar: member.user.displayAvatarURL({
							size: 2048,
							format: "png"
						})
					})
				);
				this.client.logger.info(a1(`[ USER ] ${main(member.user.tag)} [ GUILD ] ${sec(member.guild.name)} [ USER JOINED ]`));

				await webhook
					.send(welcomeEmbed)
					.then(() => webhook.delete())
					.catch(() => this.client.logger.info(fourth("Webhook messed up :(")));
			}
		}
	}
}
function shuffle(a: string[]) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
