import { TextChannel, GuildMember, Message } from "discord.js";
import Client from "./Client";
export default class giveawayManager {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}
	getGiveaways() {
		return this.client.gp.ensure("givaways", []);
	}
	create(i: malilStartGiveaway) {
		this.client.gp.ensure("givaways", []);
		this.client.gp.push("giveaways", i);
	}
	find(i: string) {
		return this.client.gp.find((i) => i.id == i);
	}
	time(time: number) {
		return time + Date.now();
	}
	start(giveaway: malilStartGiveaway) {
		if (!giveaway.time) throw new console.error("THERE MUST BE A END TIME");

		return this.create(giveaway);
	}
	async end(giveaway: malilStartGiveaway, users: string[]) {
		const channel = (this.client.channels.cache.get(giveaway.channel) || (await this.client.channels.fetch(giveaway.channel))) as TextChannel;
		const message = channel.messages.cache.get(giveaway.message) || (await channel.messages.fetch(giveaway.message));
		const oldEmbed = message.embeds;
		message.edit(this.client.util.embed(oldEmbed).setDescription("This giveaway has ended"));
		message.channel.send(`the giveaway for **${giveaway.prize}** has ended and the winner is ${users.map((i) => `${i}, `)}`);
		return true;
	}
	async getWinners(giveaway: malilStartGiveaway) {
		const channel = (this.client.channels.cache.get(giveaway.channel) || (await this.client.channels.fetch(giveaway.channel))) as TextChannel;
		const message = channel.messages.cache.get(giveaway.message) || (await channel.messages.fetch(giveaway.message));
		const winners: string[] = [];

		for (let i = 0; i < giveaway.winners; i++) {
			winners.push(this.getWinner(message, giveaway));
		}
		return winners;
	}
	getWinner(message: Message, giveaway: malilStartGiveaway) {
		const reaction = message.reactions.cache[Math.floor(Math.random() * message.reactions.cache.size)];
		if (this.checkUser(reaction.member, giveaway)) {
			return reaction.member;
		} else {
			this.getWinner(message, giveaway);
		}
	}
	checkUser(member: GuildMember, giveaway: malilStartGiveaway) {
		for (const role of giveaway.options.roles) {
			if (!member.roles.cache.has(role)) return false;
		}
		return true;
	}
	userChecks(giveaway: malilStartGiveaway, member: GuildMember) {
		for (const role of giveaway.options.roles) {
			if (!member.roles.cache.has(role)) return false;
			else continue;
		}
	}
	load() {
		for (const giveaway of this.getGiveaways()) {
			this.rungiveaway(giveaway);
		}
	}
	rungiveaway(giveaway: malilStartGiveaway) {
		setTimeout(async () => {
			this.end(giveaway, await this.getWinners(giveaway));
		}, giveaway.time - Date.now());
	}
}
interface malilStartGiveaway {
	winners: number;
	time: number;
	prize: string;
	options?: {
		roles?: string[];
		messages?: number;
		joindate?: number;
	};
	channel: string;
	message: string;
}
