import { Listener } from 'discord-akairo';
import Client from '../../client/Client';
import os from "os";
const { exec } = require("child_process");
const core = os.cpus()[0];
const djsversion = require("discord.js").version;
const akairov = require("discord-akairo").version;
const version = require("../../../package.json").version

export default class Ready extends Listener {
    client: Client
    public constructor(client: Client) {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }
    public exec() {
        console.log(
            
// "..-..-.       .-.   _ .-.                         \n",
//": `' :       : :  :_;: :                          \n",
// ": .. : .--.  : :  .-.: :                          \n",
// ": :; :' .; ; : :_ : :: :                          \n",
// ": :; :' .; ; : :_ : :: :_                         \n",
// ":_;:_;`.__,_;`.__;:_;`.__;                        \n",
`\x1b[33m ${version} [ ${this.client.user.username} ]\x1b[0m                           \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.commandHandler.modules.size}\x1b[33m - Commands\x1b[0m          \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.listenerHandler.modules.size}\x1b[33m  - Listeners\x1b[0m           \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.inhibitorHandler.modules.size}\x1b[33m  - Inhibitors\x1b[0m           \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.guilds.cache.size}\x1b[33m  - Servers\x1b[0m           \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\x1b[33m - People\x1b[0m           \n`,
`         \x1b[31m├ - Loaded  \x1b[33m- \x1b[34m${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}\x1b[33m - Channels\x1b[0m            \n`,
`         \x1b[31m├ - Version \x1b[33m- \x1b[34m${akairov}\x1b[33m    - Akairo\x1b[0m            \n`,
`         \x1b[31m├ - Version \x1b[33m- \x1b[34m${djsversion}\x1b[33m   - Discord.js\x1b[0m            \n`,
`         \x1b[31m╰ - Version \x1b[33m- \x1b[34m${process.version}\x1b[33m - Node.js\x1b[0m            `,
        )
        // this.client.logger.info(`\x1b[33m[CLIENT STARTED]\x1b[32m: Im ${this.client.user.tag} Ready To Go`)
        // this.client.logger.info(`\x1b[33m[COMMANDS LOADED]\x1b[32m: ${this.client.commandHandler.modules.size}`)
        // this.client.logger.info(`\x1b[33m[LISTENERS LOADED]\x1b[32m: ${this.client.listenerHandler.modules.size}`)
        // this.client.logger.info(`\x1b[33m[INHIBITORS LOADED]\x1b[32m: ${this.client.inhibitorHandler.modules.size}`)

        // —— requireing the config
        const config = require("../../../config.json") 
        const { status, games, interval } = config.presence;

        // —— Set default presence
        games instanceof Array && games.length > 0 &&
            this.client.user.setPresence({
                status,
                activity: {
                    name: games[0].name ? games[0].name : null,
                    type: games[0].type ? games[0].type : null,
                    url : games[0].url  ? games[0].url  : null
                }
            })

		games instanceof Array && games.length > 1 &&
		
            setInterval(() => {

				const index = Math.floor(Math.random() * (games.length));
				
                this.client.user.setActivity(games[index].name, {
                    type: games[index].type,
                    url : games[index].url || "https://www.twitch.tv/"
                });
            }, ((typeof interval === "number" && interval) || 30) * 1000);
    }
}