import { Listener } from "discord-akairo";
import Client from "../../client/Client";
import * as readline from 'readline'
import util from 'util'
import settings from '../../../settings.js'
import { red, blue, yellow, green, whiteBright, white, cyan, bold, hex } from "chalk";
const djsversion = require("discord.js").version;
const akairov = require("discord-akairo").version;
const version = require("../../../package.json").version;

export default class Ready extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client"
		});
		this.client = client;
	}
	public async exec() {
		const
			l1 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l2 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l3 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l4 = "⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l5 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l6 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l7 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l8 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l9 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l10 = "⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l11 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l12 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l13 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l14 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍"
		const
			q1 = hex("#D900FF")(`${version} [ ${this.client.user.username} ]`),
			a1 = this.client.commandHandler.modules.size,
			a2 = this.client.listenerHandler.modules.size,
			a3 = this.client.inhibitorHandler.modules.size,
			a4 = this.client.guilds.cache.size,
			a5 = this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0),
			a6 = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

		if (settings.dev == true) {
		}
	}
}