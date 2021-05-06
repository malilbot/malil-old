import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import { Settings, credentials, consts } from "../settings";
import { superUsers } from "../Lib/config";
import TaskHandler from "./TaskHandler";
import { logger } from "../Lib/Utils";
import BotLists from "./BotLists";
import { join } from "path";
import Enmap from "enmap";

interface Option {
	owners?: string | string[];
	superUsers?: string | string[];
	token?: string;
}

export default class Client extends AkairoClient {
	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "Commands"),
		prefix: async (message) => {
			if (message?.guild == null) return [Settings.prefix, "malil"];
			else return [this.prefixes.ensure(message.guild.id, Settings.prefix, "prefix"), "malil"];
		},
		aliasReplacement: /-g/,
		allowMention: true,
		handleEdits: true,
		ignorePermissions: superUsers,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 6000,
		argumentDefaults: {
			prompt: {
				modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
				timeout: "You took too long, the command has been cancelled now.",
				ended: "You exceeded the maximum amout of tries, this command has now been cancelled.",
				cancel: "This command has been cancelled now.",
				retries: 3,
				time: 30000,
			},
			otherwise: "",
		},
	});
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "Listeners"),
	});

	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, "..", "Inhibitors"),
	});

	public taskHandler: TaskHandler = new TaskHandler(this, {
		directory: join(),
	});

	public botLists: BotLists = new BotLists(this, {
		topgg: credentials.bottokens.topgg,
		discordbotlist: credentials.bottokens.discordbotlist,
	});
	public config: Option;

	public constructor(config: Option) {
		super({
			ownerID: config.owners,
			superUserID: config.superUsers,
			intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_WEBHOOKS", "GUILD_INTEGRATIONS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING"],
			messageSweepInterval: 1800, // 30 mins
			messageCacheLifetime: 1800, // 30 mins
			presence: {
				activities: [
					{
						name: `guilds | /invite`,
						type: "COMPETING",
					},
				],
			},
			allowedMentions: {
				parse: ["users"],
			},
		});
		this.settings = Settings;
		this.consts = consts;
		this.colors = consts.colors;
		this.credentials = credentials;
		this.config = config;
		this.logger = logger;
		const databases = ["gp", "logchannel", "tags", "prefixes", "blacklist", "guilddata", "mutes", "releases", "infractions", "userdata"];
		for (const item in databases) {
			const name = databases[item];
			this[name] = new Enmap({ name, dataDir: join(__dirname, "..", "..", "data", name), polling: Settings.polling });
		}
	}

	public _init(): void {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});

		this.inhibitorHandler.loadAll();
		this.taskHandler.loadall();
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async goo(): Promise<unknown> {
		this._init();
		return await this.login(this.config.token);
	}
}

declare module "discord-akairo" {
	interface AkairoClient {
		commandHandler: CommandHandler;
		settings: typeof Settings;
		credentials: typeof credentials;
		consts: typeof consts;
		colors: typeof consts.colors;
		logger: typeof logger;
		tags: Enmap;
		prefixes: Enmap;
		blacklist: Enmap;
		releases: Enmap;
		logchannel: Enmap;
		infractions: Enmap;
		ColorNames: Enmap;
		gp: Enmap;
		guilddata: Enmap;
		mutes: Enmap;
		userdata: Enmap;
	}
}
