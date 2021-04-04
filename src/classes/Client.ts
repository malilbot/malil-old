import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import { Settings, credentials, consts } from "../settings";
import TaskHandler from "./TaskHandler";
import { superUsers } from "../lib/config";
import BotLists from "./BotLists";
import Server from "./Server";
import { logger, readyLog } from "../lib/Utils";
import { join } from "path";
import Enmap from "enmap";
declare module "discord-akairo" {
	interface AkairoClient {
		settings: typeof Settings;
		credentials: typeof credentials;
		consts: typeof consts;
		colors: typeof consts.colors;
		ReadyLog: typeof readyLog;
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
		UserData: Enmap;
	}
}

interface Option {
	owners?: string | string[];
	superUsers?: string | string[];
	token?: string;
}

export default class Client extends AkairoClient {
	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "Commands"),
		prefix: (message) => {
			if (message.guild !== null) this.prefixes.ensure(message.guild.id, {});
			if (message.guild == null || !this.prefixes.get(message.guild.id, "prefix")) {
				return [Settings.prefix, "malil"];
			} else {
				return [this.prefixes.get(message.guild.id, "prefix"), "malil"];
			}
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

	public server: Server = new Server(this, {
		online: Settings.site,
		port: 3001,
		topAuth: Settings.auth.topAuth,
		dbotsAuth: Settings.auth.dbotsAuth,
	});

	public botLists: BotLists = new BotLists(this, {
		topgg: credentials.bottokens.topgg,
		discordbotlist: credentials.bottokens.discordbotlist,
	});
	public config: Option;

	public constructor(config: Option) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		super({
			ownerID: config.owners,
			superUserID: config.superUsers,
			intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_WEBHOOKS", "GUILD_INTEGRATIONS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING"],
			messageSweepInterval: 1800, // 30 mins
			messageEditHistoryMaxSize: 2,
			messageCacheLifetime: 1800, // 30 mins
			presence: {
				// @ts-expect-error - https://github.com/discordjs/discord.js/pull/5317
				activities: [
					{
						name: `${Settings.prefix}help`,
						type: "LISTENING",
					},
				],
			},
		});
		this.ReadyLog = readyLog;
		this.settings = Settings;
		this.consts = consts;
		this.colors = consts.colors;
		this.credentials = credentials;
		this.config = config;
		this.logger = logger;
		this.gp = new Enmap({ name: "gp", dataDir: join(__dirname, "..", "..", "data/gp"), polling: true });
		this.logchannel = new Enmap({ name: "logchannel", dataDir: join(__dirname, "..", "..", "data/logchannel"), polling: true });
		this.tags = new Enmap({ name: "tags", dataDir: join(__dirname, "..", "..", "data/tags"), polling: true });
		this.prefixes = new Enmap({ name: "prefixes", dataDir: join(__dirname, "..", "..", "data/prefixes"), polling: true });
		this.blacklist = new Enmap({ name: "blacklist", dataDir: join(__dirname, "..", "..", "data/blacklist"), polling: true });
		this.guilddata = new Enmap({ name: "guildata", dataDir: join(__dirname, "..", "..", "data/guilddata"), polling: true });
		this.mutes = new Enmap({ name: "mutes", dataDir: join(__dirname, "..", "..", "data/mutes"), polling: true });
		this.releases = new Enmap({ name: "releases", dataDir: join(__dirname, "..", "..", "data/releases"), polling: true });
		this.infractions = new Enmap({ name: "infractions", dataDir: join(__dirname, "..", "..", "data/infractions"), polling: true });
		this.UserData = new Enmap({ name: "users", dataDir: join(__dirname, "..", "..", "data/userData"), polling: true });
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
		this.server.Start();
	}

	public async goo(): Promise<unknown> {
		this._init();
		return await this.login(this.config.token);
	}
}
