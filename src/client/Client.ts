import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { join } from 'path';
import { Logger } from 'winston';
import { logger } from '../Utils/Utils';

import enmap from 'enmap';
declare module 'discord-akairo' {
    interface AkairoClient {
        logger: Logger
    }
}

interface Option {
    owners? : string | string[];
    token?: string;
    prefix?: string;
    blacklist?: string | string[];
}



export default class Client extends AkairoClient {
    

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "Commands"),
        prefix: process.env.PREFIX,
        aliasReplacement: /-g/,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
                modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
                timeout: "You took too long, the command has been cancelled now.",
                ended: "You exceeded the maximum amout of trie, this command has now been cancelled.",
                cancel: "This command has been cancelled now.",
                retries: 3,
                time: 30000,
            },
            otherwise: "",
        }
    });
    public listenerHandler: ListenerHandler = new ListenerHandler(this, { directory: join(__dirname, "..", "Listeners")});

    public cprefix?: enmap = new enmap({name: "cprefix"});

    public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '..', 'Inhibitors')});
    public config: Option;
    public settings: Option
    public constructor(config: Option) {
        super(
            {   ownerID: config.owners },
            {
                disableMentions: "everyone",
            },
        );
        this.config = config;
        this.logger = logger;
    }

    public _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });
        this.inhibitorHandler.loadAll()
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll()
    }


    public async goo() {
        await this._init();
        return this.login(this.config.token);
    }
}