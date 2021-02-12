/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import { join } from "path";
import { Logger } from "winston";
import { logger } from "../Utils/Utils";
import settings from '../../settings.js'
import Enmap from "enmap";
declare module "discord-akairo" {
	interface AkairoClient {
		setting: settings
		logger: Logger;
		tags: Enmap;
		prefixes: Enmap;
		blacklist: Enmap;
		releases: Enmap;
	}
}

interface Option {
	owners?: string | string[];
	token?: string;
}

export default class Client extends AkairoClient {
	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "Commands"),
		prefix: (message) => {
			if (message.guild !== null) this.prefixes.ensure(message.guild.id, {});
			if (message.guild == null || !this.prefixes.get(message.guild.id, "prefix")) {
				return settings.prefix;
			} else {
				return this.prefixes.get(message.guild.id, "prefix");
			}
		},
		//{if(message.guild == null){return process.env.PREFIX} else if(db.fetch(`guild.${message.guild.id}.pf`)){ return db.fetch(`guild.${message.guild.id}.pf`) } else { return process.env.PREFIX}},
		aliasReplacement: /-g/,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 6000,
		argumentDefaults: {
			prompt: {
				modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				timeout: "You took too long, the command has been cancelled now.",
				ended: "You exceeded the maximum amout of trie, this command has now been cancelled.",
				cancel: "This command has been cancelled now.",
				retries: 3,
				time: 30000
			},
			otherwise: ""
		}
	});
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "Listeners")
	});

	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, "..", "Inhibitors")
	});

	public config: Option

/*
	public tags: Enmap = new Enmap({ name: "tags" });

	public prefixes: Enmap = new Enmap({ name: "prefixes" });

	public blacklist: Enmap = new Enmap({ name: "blacklist" });

	public releases: Enmap = new Enmap({ name: "releases" });
*/

	public constructor(config: Option) {
		super(
			{ ownerID: config.owners },
			{
				disableMentions: "everyone"
			}
		);
		this.setting = settings
		this.config = config;
		this.logger = logger;
		this.tags = new Enmap({ name: "tags" });
		this.prefixes = new Enmap({ name: "prefixes" });
		this.blacklist = new Enmap({ name: "blacklist" });
		this.releases = new Enmap({ name: "releases" });
	}

	public _init() {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});
		this.inhibitorHandler.loadAll();
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async goo() {
		await this._init();
		return this.login(this.config.token);
	}
}
