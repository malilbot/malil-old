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
		if (settings.dev == true) {
			// prettier-ignore
			console.log(green.bold`
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + white(" Malil")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + whiteBright(" api")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${hex("#D900FF")(`${version} [ ${this.client.user.username} ]`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.commandHandler.modules.size}     ${red('-')} Commands`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.listenerHandler.modules.size}     ${red('-')} Listeners`)}     
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.inhibitorHandler.modules.size}      ${red('-')} Inhibitors`)}   
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.guilds.cache.size}     ${red('-')} Servers`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}    ${red('-')} Channels`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${blue('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  ${red('-')} People`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${blue('-')} ${green(`${process.version} ${red('-')} Node.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${blue('-')} ${green(`${akairov}    ${red('-')} Akairo`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('╰')} ${yellow('-')} ${red('Version')} ${blue('-')} ${green(`${djsversion}   ${red('-')} Discord.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ 
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍
`)
		} else {
			// prettier-ignore
			console.log(cyan.bold`
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + white(" Malil")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green("[+]") + whiteBright(" api")}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${blue(`${version} [ ${this.client.user.username} ]`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.commandHandler.modules.size}     ${yellow('-')} Commands`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.listenerHandler.modules.size}     ${yellow('-')} Listeners`)}     
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.inhibitorHandler.modules.size}      ${yellow('-')} Inhibitors`)}   
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.size}     ${yellow('-')} Servers`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}    ${yellow('-')} Channels`)}
⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Loaded')}  ${yellow('-')} ${green(`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  ${yellow('-')} People`)}
⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍ℤℤℤ⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${process.version} ${yellow('-')} Node.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('├')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${akairov}    ${yellow('-')} Akairo`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ${green('╰')} ${yellow('-')} ${red('Version')} ${yellow('-')} ${green(`${djsversion}   ${yellow('-')} Discord.js`)}
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ℤℤ⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ 
⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍
`);
		}
		if (this.client.setting.rpc.on == true) {
			const rpc = require("discord-rpc")
			const client = new rpc.Client({ transport: 'ipc' })
			client.on('ready', () => {
				client.request('SET_ACTIVITY', {
					pid: process.pid,
					activity: {
						details: this.client.setting.rpc.activity.details,
						assets: {
							large_image: this.client.setting.rpc.activity.assets.large_image,
							large_text: this.client.setting.rpc.activity.assets.large_text
						},
						buttons: this.client.setting.rpc.activity.buttons
					}
				})
			})
			client.login({ clientId: "795717859170844673" }).catch(console.error);
		}
		this.client.user.setPresence({
			activity: {
				name: "Prefix * or @ me",
				type: "PLAYING",
				url: null
			}
		});
	}
}
