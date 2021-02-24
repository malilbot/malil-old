import { Listener } from "discord-akairo";
import Client from "../../client/Client";
import { fixspace } from "../../lib/Utils"
import { log } from "console"
import settings from '../../../settings.js'
import { red, blue, yellow, green, magenta, whiteBright, bgWhite, bgBlack, greenBright, cyanBright, white, cyan, bold, black, hex, reset } from "chalk";
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
		/* AASCII LAYS BELOW
		███╗   ███╗ █████╗ ██╗     ██╗██╗
		████╗ ████║██╔══██╗██║     ██║██║
		██╔████╔██║███████║██║     ██║██║
		██║╚██╔╝██║██╔══██║██║     ██║██║
		██║ ╚═╝ ██║██║  ██║███████╗██║███████╗
		╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝
		
		 ███▄ ▄███▓ ▄▄▄       ██▓     ██▓ ██▓
		▓██▒▀█▀ ██▒▒████▄    ▓██▒    ▓██▒▓██▒
		▓██    ▓██░▒██  ▀█▄  ▒██░    ▒██▒▒██░
		▒██    ▒██ ░██▄▄▄▄██ ▒██░    ░██░▒██░
		▒██▒   ░██▒ ▓█   ▓██▒░██████▒░██░░██████▒
		░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒░▓  ░░▓  ░ ▒░▓  ░
		░  ░      ░  ▒   ▒▒ ░░ ░ ▒  ░ ▒ ░░ ░ ▒  ░
		░      ░     ░   ▒     ░ ░    ▒ ░  ░ ░
			   ░         ░  ░    ░  ░ ░      ░  ░
		*/

		const
			ll1 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll2 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll3 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll4 = "⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll5 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			ll6 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			ll7 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			ll8 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			ll9 = "⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l10 = "⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍",
			l11 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l12 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l13 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l14 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍"
		const
			q1 = (`${version} [ ${this.client.user.username} ]`),
			q2 = 5,
			a1 = await fixspace(this.client.commandHandler.modules.size, q2),
			a2 = await fixspace(this.client.listenerHandler.modules.size, q2),
			a3 = await fixspace(this.client.inhibitorHandler.modules.size, q2),
			a4 = await fixspace(this.client.guilds.cache.size, q2),
			a5 = await fixspace(this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0), q2),
			a6 = await fixspace(this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0), q2),
			a7 = await fixspace(this.client.options.shardCount, q2)
		const
			b1 = " ███╗   ███╗ █████╗ ██╗     ██╗██╗",
			b2 = " ████╗ ████║██╔══██╗██║     ██║██║",
			b3 = " ██╔████╔██║███████║██║     ██║██║",
			b4 = " ██║╚██╔╝██║██╔══██║██║     ██║██║",
			b5 = " ██║ ╚═╝ ██║██║  ██║███████╗██║███████╗",
			b6 = " ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝"
		let
			main,
			sec,
			third,
			fourth,
			split
		if (settings.dev == true) {
			main = red
			sec = yellow
			third = cyan
			fourth = bgWhite.black
			split = greenBright(" - ")
		} else {
			main = blue
			sec = green
			third = magenta
			fourth = bgBlack.white
			split = cyanBright(" - ")
		}
		log(main(ll1) + reset(fourth(q1)))
		log(main(ll2) + sec(b1))
		log(main(ll3) + sec(b2))
		log(main(ll4) + sec(b3))
		log(main(ll5) + sec(b4))
		log(main(ll6) + sec(b5))
		log(main(ll7) + sec(b6))
		log(main(ll8), split, third(a1), split, third("Commands"))
		log(main(ll9), split, third(a2), split, third("Listeners"))
		log(main(l10), split, third(a3), split, third("Inhibitors"))
		log(main(l11), split, third(a4), split, third("Guilds"))
		log(main(l12), split, third(a5), split, third("Channels"))
		log(main(l13), split, third(a6), split, third("Users"))
		log(main(l14), split, third(a7), split, third("Shards"))
	}
}