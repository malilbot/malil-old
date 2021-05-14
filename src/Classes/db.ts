/* eslint-disable */
import Client from "./Client";
import Knex from "knex";
import { connection } from "../settings";
export default class db {
	client: Client;
	guilds: any;
	users: any;
	gp: any;
	constructor(client: Client) {
		this.client = client;
	}
	public knex = Knex({
		client: "pg",
		connection,
	});

	public find(table, limit, order_by, sort_order = "desc") {
		if (!limit) {
			return this.knex(table);
		} else if (limit && !order_by) {
			return this.knex(table).limit(limit);
		} else if (limit && order_by) {
			return this.knex(table).limit(limit).orderBy(order_by, sort_order);
		}
	}

	public findBy(table, filter) {
		return this.knex(table).where(filter);
	}

	public async insert(table, data) {
		const [id] = await this.knex(table).insert(data);

		return await this.findBy(table, { id });
	}

	public remove(table, filter) {
		return this.knex(table).where(filter).delete();
	}

	public async update(table, data, filter) {
		await this.knex(table).where(filter).update(data);
		return await this.knex(table).where(filter);
	}

	public closeConnection() {
		return this.knex.destroy();
	}
	public CreateTables() {
		this.knex.schema.createTable("users", (table) => {
			table.bigInteger("id").primary();
			table.integer("iq");
			table.integer("votes");
			table.bigInteger("messages");
		});

		this.knex.schema.createTable("guilds", (table) => {
			table.bigInteger("id").primary();
			table.bigInteger("muterole");
			table.bigInteger("modrole");
			table.bigInteger("github");
			table.bigInteger("modlogs");
			table.bigInteger("emoji");
			table.bigInteger("starboard");
			table.integer("emojicount");
			table.boolean("stickers");
			table.string("prefix");
		});

		this.knex.schema.createTable("infractions", (table) => {
			table.bigInteger("when");
			table.bigInteger("user");
			table.bigInteger("id").primary();
			table.bigInteger("guild");
			table.bigInteger("moderator");
			table.string("reason");
			table.string("type");
		});
	}
	/**
	 *
	 * @param user id of the user you want to infraction
	 * @param infraction message id as a unique identifier
	 * @param guild  Guild ID these are store globally and not per guild
	 * @param reason
	 * @param type ban, kick, mute, unmute, warn
	 */
	public async createInfraction(user: string, infraction: string, guild: string, moderator: string, reason: string, type: string): Promise<any> {
		const data = {
			when: Date.now(),
			user: BigInt(user),
			id: BigInt(infraction + this.client.random(99)),
			guild: BigInt(guild),
			moderator: BigInt(moderator),
			reason,
			type,
		};
		await this.knex("infractions").insert(data);
	}
	public async deleteInfraction(infractionId: string): Promise<void> {
		const id = BigInt(infractionId);
		this.remove("infractions", { id });
	}
	public async deleteInfractions(userId: string, guildId: string): Promise<void> {
		const guild = BigInt(guildId);
		const user = BigInt(userId);
		this.remove("infractions", { user, guild });
	}
	public async getInfractions(userId: string, guildId: string): Promise<infraction[]> {
		const user = BigInt(userId);
		const guild = BigInt(guildId);
		const infractions = await this.knex("infractions").where({ user, guild });
		return infractions;
	}
	public async getModActions(modId: string, guildId: string): Promise<infraction[]> {
		const moderator = BigInt(modId);
		const guild = BigInt(guildId);
		const infractions = await this.knex("infractions").where({ moderator, guild });
		return infractions;
	}
	public query(input: any): any {
		return this.knex.raw(input);
	}
	public connect() {
		/* this.guilds.sync();
		this.users.sync();
		this.gp.sync(); */
	}
	public async kill() {
		return await this.knex.destroy();
	}
	public async getUser(i: string | bigint): Promise<{ id: bigint; iq: number; votes: number; messages: bigint }> {
		const id = BigInt(i);
		let [user] = await this.findBy("users", { id });

		if (!user) {
			const userData = {
				id: id,
				iq: Math.floor(Math.random() * 150) + 1,
				votes: 0,
				messages: 1n,
			};
			await this.knex("users").insert(userData);
			return userData;
		}
		return user;
	}

	public async increaseVotes(user: string | bigint, amount: number) {
		const id = BigInt(user);
		const votes = Number((await this.getUser(user)).votes);
		const newvotes = votes + Number(amount);

		await this.knex("users").where({ id }).update({ votes: newvotes });

		return newvotes;
	}
	public async increaseIq(user: string | bigint, amount: number) {
		const id = BigInt(user);
		const iq = Number((await this.getUser(user)).iq);
		const newiq = iq + Number(amount);

		await this.knex("users").where({ id }).update({ votes: newiq });

		return newiq;
	}
	public async getPrefix(i: string) {
		const id = BigInt(i);
		let [guild] = await this.findBy("guilds", { id });
		return guild?.prefix || this.client.settings.prefix;
	}
	public async setPrefix(guildID: string, prefix: string) {
		const id = BigInt(guildID);
		let [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ prefix });
		} else if (!guild) {
			const guildData = {
				id: id,
				muterole: null,
				github: null,
				modlogs: null,
				emoji: null,
				starboard: null,
				emojicount: 3,
				stickers: true,
				prefix: prefix,
			};
			await this.knex("guilds").insert(guildData);
		}

		return prefix;
	}
}
export interface infraction {
	when: number;
	user: BigInt;
	id: BigInt;
	guild: BigInt;
	reason: string;
	type: string;
}
/*
abstract class giveaway {
	public winners: 0;
	public time: 0;
	public prize: "string";
	public options: {
		roles: ["string"];
		messages: 0;
		joindate: 0;
	};
	public channel: "string";
	public message: "string";
	public guildId: "string";
}
abstract class mute {
	public id: "string";
	public time: 0;
}
abstract class infraction {
	public when: 0;
	public who: "string";
	public reason: "string";
	public type: "string";
}
*/
