import { Listener } from 'discord-akairo';
import Client from '../../client/Client';

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
        this.client.logger.info(`[CLIENT READY]: Im ${this.client.user?.tag} Ready To Go`)
        this.client.logger.info(`[COMMANDS LOADED]: ${this.client.commandHandler.modules.size}`)
        this.client.logger.info(`[LISTENERS LOADED]: ${this.client.listenerHandler.modules.size}`)
        this.client.logger.info(`[INHIBITORS LOADED]: ${this.client.inhibitorHandler.modules.size}`)
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
            });

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