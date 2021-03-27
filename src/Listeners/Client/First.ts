import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import Client from "../../lib/Client";
import { mkdir } from "fs";
import { main, sec, third, fourth, a1, split, sleep } from "../../lib/Utils";
export default class First extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("first", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}

	async exec(): Promise<void> {
		if (
			!this.client.blacklist.get("blacklist") ||
			!this.client.blacklist.get("blacklisted") ||
			!this.client.blacklist.get("blacklisted", "guilds") ||
			!this.client.blacklist.get("blacklisted", "list") ||
			!this.client.gp.get("superUsers") ||
			!this.client.blacklist.get("blacklist", "leavelist") ||
			!this.client.releases.get("all") ||
			!this.client.gp.get("shitpost")
			//!this.client.gp.get("commands")
		) {
			setInterval(() => {
				log(this.client);
			}, 0);
			innitialize(this.client).then((res) => {
				log(this.client);
			});
		}
	}
}
const log = function (client) {
	client.logger.info(main("[ LOADING DB FIRST TIME ]"));
	client.logger.info(sec("[ DATABASE LOADED ]"));
	client.logger.info(sec("[ PLEASE RESTART THE BOT ]"));
	client.logger.info(sec("[ TO MAKE SURE EVERYTHING WENT THROUGH ]"));
	client.logger.info(third("[ REPO: https://github.com/SkyBlockDev/malil-akairo ]"));
	client.logger.info(third("[ DISCORD: https://discord.gg/mY8zTARu4g ]"));
	client.logger.info(third("[ WEBSITE:  https://tricked-dev.gitbook.io/malil/ ]"));
};
const innitialize = async function (client) {
	await client.blacklist.ensure("blacklisted", [], "guilds");
	await client.blacklist.ensure("blacklisted", [], "list");
	await client.gp.ensure("superUsers", []);
	await client.blacklist.ensure("blacklist", [], "leavelist");
	await client.releases.ensure("all", []);
	await client.gp.ensure("commands", 0);
	await client.gp.ensure("shitpost", []);
};
