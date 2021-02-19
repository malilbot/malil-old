/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import TaskHandler from "../lib/taskhandler"
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
		logchannel: Enmap;
		infractions: Enmap;
		ColorNames: Enmap;
		gp: Enmap;
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
				return [settings.prefix, "malil"]
			} else {
				return [this.prefixes.get(message.guild.id, "prefix"), 'malil']
			}
		},
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

	public taskHandler: TaskHandler = new TaskHandler(this, {
		directory: join()
	})

	public config: Option

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
		this.logchannel = new Enmap({ name: "logchannel" });
		this.tags = new Enmap({ name: "tags" });
		this.prefixes = new Enmap({ name: "prefixes" });
		this.blacklist = new Enmap({ name: "blacklist" });
		this.releases = new Enmap({ name: "releases" });
		this.infractions = new Enmap({ name: "infractions" });
		this.ColorNames = new Enmap({ name: "colorNames" });
		this.gp = new Enmap({ name: "gp" });
	}

	public _init() {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});
		this.inhibitorHandler.loadAll();
		this.taskHandler.loadall();
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async goo() {
		await this._init();
		return this.login(this.config.token);
	}
}
