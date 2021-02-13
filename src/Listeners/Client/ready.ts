import { Listener } from "discord-akairo";
import Client from "../../client/Client";
import * as readline from 'readline'
import util from 'util'
import { red, blue, yellow, green, whiteBright, white, cyan, bold } from "chalk";
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
		// prettier-ignore
		console.log(cyan.bold`

⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + white(" Malil")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + whiteBright(" api")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${blue(`${version} [ ${this.client.user.username} ]`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.commandHandler.modules.size}     ${yellow('-')} Commands`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.listenerHandler.modules.size}     ${yellow('-')} Listeners`)}     
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.inhibitorHandler.modules.size}      ${yellow('-')} Inhibitors`)}   
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.size}     ${yellow('-')} Servers`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.size}     ${yellow('-')} Servers`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  ${yellow('-')} People`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}    ${yellow('-')} Channels`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${akairov}    ${yellow('-')} Akairo`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${djsversion}   ${yellow('-')} Discord.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('╰')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${process.version} ${yellow('-')} Node.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍
`);

		/*
		// console.clear()
		console.log(
			// "..${yellow('-')}..${yellow('-')}.       .${yellow('-')}.   _ .${yellow('-')}.                         \n",
			//": `' :       : :  :_;: :                          \n",
			// ": .. : .${yellow('-')}${yellow('-')}.  : :  .${yellow('-')}.: :                          \n",
			// ": :; :' .; ; : :_ : :: :                          \n",
			// ": :; :' .; ; : :_ : :: :_                         \n",
			// ":_;:_;`.__,_;`.__;:_;`.__;                        \n",
			`\x1b[33m ${version} [ ${this.client.user.username} ]\x1b[0m\n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.commandHandler.modules
				.size}\x1b[33m  ${yellow('-')} Commands\x1b[0m\n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.listenerHandler.modules
				.size}\x1b[33m   ${yellow('-')} Listeners\x1b[0m                              \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.inhibitorHandler.modules
				.size}\x1b[33m   ${yellow('-')} Inhibitors\x1b[0m                            \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.guilds.cache
				.size}\x1b[33m   ${yellow('-')} Servers\x1b[0m                                           \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.guilds.cache.reduce(
				(a, b) => a + b.memberCount,
				0
			)}\x1b[33m  ${yellow('-')} People\x1b[0m           \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} ${red('Loaded')}  \x1b[33m${yellow('-')} \x1b[34m${this.client.guilds.cache.reduce(
				(a, b) => a + b.channels.cache.size,
				0
			)}\x1b[33m ${yellow('-')} Channels\x1b[0m \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} Version \x1b[33m${yellow('-')} \x1b[34m${akairov}\x1b[33m    ${yellow('-')} Akairo\x1b[0m                                                                \n`,
			`         \x1b[31m${green('├')} ${yellow('-')} Version \x1b[33m${yellow('-')} \x1b[34m${djsversion}\x1b[33m   ${yellow('-')} Discord.js\x1b[0m                                                          \n`,
			`         \x1b[31m${green('╰')} ${yellow('-')} Version \x1b[33m${yellow('-')} \x1b[34m${process.version}\x1b[33m ${yellow('-')} Node.js\x1b[0m                                                            `
			// ' \x1b[31m${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}${yellow('-')}\x1b[0m'
		);
		// this.client.logger.info(`\x1b[33m[CLIENT STARTED]\x1b[32m: Im ${this.client.user.tag} Ready To Go`)
		// this.client.logger.info(`\x1b[33m[COMMANDS ${red('Loaded')}]\x1b[32m: ${this.client.commandHandler.modules.size}`)
		// this.client.logger.info(`\x1b[33m[LISTENERS ${red('Loaded')}]\x1b[32m: ${this.client.listenerHandler.modules.size}`)
		// this.client.logger.info(`\x1b[33m[INHIBITORS ${red('Loaded')}]\x1b[32m: ${this.client.inhibitorHandler.modules.size}`)
		// —— requireing the config
		/*
		const config = require("../../../config.json");
		const { status, games, interval } = config.presence;

		// —— Set default presence
		games instanceof Array &&
			games.length > 0 &&
			this.client.user.setPresence({
				status,
				activity: {
					name: games[0].name ? games[0].name : null,
					type: games[0].type ? games[0].type : null,
					url: games[0].url ? games[0].url : null
				}
			});

		games instanceof Array &&
			games.length > 1 &&
			setInterval(() => {
				const index = Math.floor(Math.random() * games.length);

				this.client.user.setActivity(games[index].name, {
					type: games[index].type,
					url: games[index].url || "https://www.twitch.tv/"
				});
			}, ((typeof interval === "number" && interval) || 30) * 1000);
			*/
		this.client.user.setPresence({
			activity: {
				name: "Prefix * or @ me",
				type: "PLAYING",
				url: null
			}
		});

		const client = this.client

		const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: true
		});
		let thing = ''
		rl.on('line', async function(line){
			if(line == "clean") return thing = ''

			try {
			const evaled = await eval(thing + line.replace(/this.client/g, 'client'))
			thing += line + ';'
			const output = util.inspect(evaled, { depth: 3 });
			console.log(output)
		} catch (e) {
			
			console.log(e)
			
		}})
		/*
		var readline = require("readline");

		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: false
		});

		rl.on("line", function(line) {
			const bot = this.client;
			try {
				const input = line;
				const output = eval(input);
				console.log(input);
				console.log(output);
			} catch (e) {
				console.error(e);
			}
		});
		*/
	}
}
