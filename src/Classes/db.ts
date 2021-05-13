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
			table.bigInteger("messages");
		});
		this.knex.schema.createTable("guilds", (table) => {
			table.bigInteger("id").primary();
			table.bigInteger("muterole");
			table.bigInteger("github");
			table.bigInteger("modlogs");
			table.string("prefix");
		});
	}
	public connect() {
		/* this.guilds.sync();
		this.users.sync();
		this.gp.sync(); */
	}
	async kill() {
		return await this.knex.destroy();
	}
	async getIq(i: string): Promise<number> {
		const id = BigInt(i);
		let [user] = await this.findBy("users", { id });

		if (!user) {
			const userData = {
				id: id,
				iq: Math.floor(Math.random() * 150) + 1,
				messages: 1n,
			};
			await this.knex("users").insert(userData);
			return userData.iq;
		}
		return user.iq;
	}
	async getPrefix(i: string) {
		const id = BigInt(i);
		let [guild] = await this.findBy("guilds", { id });
		return guild?.prefix || this.client.settings.prefix;
	}
	async setPrefix(guildID: string, prefix: string) {
		const id = BigInt(guildID);
		let [guild] = await this.findBy("guilds", { id });
		if (guild) {
			await this.knex("guilds").where({ id }).update({ prefix });
		} else if (!guild) {
			const userData = {
				id: id,
				muterole: null,
				github: null,
				modlogs: null,
				prefix: prefix,
			};
			await this.knex("guilds").insert(userData);
		}

		return prefix;
	}
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
