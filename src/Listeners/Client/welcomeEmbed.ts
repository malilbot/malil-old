import { Listener } from "discord-akairo";
import { GuildMember, TextChannel, Message } from "discord.js";
import Client from "../../Classes/Client";
let lastJoin: Message;
export default class WelcomeEmbed extends Listener {
	constructor(client: Client) {
		super("welcomeEmbed", {
			emitter: "client",
			event: "guildMemberAdd",
			category: "client",
		});
		this.client = client;
	}

	async exec(member: GuildMember): Promise<void> {
		if (this.client.mutes.get(member.guild.id) && this.client.mutes.get(member.guild.id, "mutes") && this.client.mutes.get(member.guild.id, "role")) {
			const mutes = this.client.mutes.get(member.guild.id, "mutes");
			if (mutes[member.id]) {
				if (Date.now() < mutes[member.id]) {
					const role = member.guild.roles.cache.get(this.client.mutes.get(member.guild.id, "role")) || (await member.guild.roles.fetch(this.client.mutes.get(member.guild.id, "role")));

					member.roles.add(role, "Left and rejoined while muted");
				}
			}
		}
		if (this.client.settings.dev == false) {
			if (member.guild.id == "748956745409232945") {
				member.roles.add("748967146498818058");
				const currentDate = new Date();

				const date = this.client.gp.ensure("welcome", currentDate.getDate(), "date");

				let amount = this.client.gp.ensure("welcome", 1, "today");

				if (currentDate.getDate() !== date) {
					this.client.gp.set("welcome", 1, "today");
					this.client.gp.set("welcome", currentDate.getDate(), "date");
					amount = 1;
				} else {
					amount = this.client.gp.ensure("welcome", 1, "today");
					this.client.gp.set("welcome", amount + 1, "today");
				}
				let e: string;
				if (lastJoin) lastJoin.delete();
				if (amount == 1) e = "User";
				lastJoin = await ((await this.client.channels.fetch("748957504666599507")) as TextChannel).send(`Welcome ${member}!\n\n` + `${amount} ${e ?? "Users"} joined today`);
			}
		}
	}
}
