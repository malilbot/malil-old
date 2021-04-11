import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
import { Settings, credentials, consts } from "../settings";
import { superUsers } from "../Lib/config";
import TaskHandler from "./TaskHandler";
import { logger } from "../Lib/Utils";
import { Message } from "discord.js";
import BotLists from "./BotLists";
import SlashHandler from "./SlashHandler";
import Server from "./Server";
import { join } from "path";
import Enmap from "enmap";

interface Option {
	owners?: string | string[];
	superUsers?: string | string[];
	token?: string;
}

export default class Client extends AkairoClient {
	public slashHandler: SlashHandler = new SlashHandler(this, {
		directory: join(__dirname, "..", "Slash"),
	});

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "Commands"),
		prefix: (message) => this.GetPrefixes(message),
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

	private GetPrefixes(message: Message) {
		if (message.guild !== null) this.prefixes.ensure(message.guild.id, {});
		if (message.guild == null || !this.prefixes.get(message.guild.id, "prefix")) {
			return [Settings.prefix, "malil"];
		} else {
			return [this.prefixes.get(message.guild.id, "prefix"), "malil"];
		}
	}

	async loadCommands() {
		for (const file of CommandHandler.readdirRecursive(this.slashHandler.directory)) {
			console.log(file);
			const { default: command } = await import(`${file}`);
			this.slashHandler.load(command);
		}
	}

	public constructor(config: Option) {
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
		this.settings = Settings;
		this.consts = consts;
		this.colors = consts.colors;
		this.credentials = credentials;
		this.config = config;
		this.logger = logger;
		this.gp = new Enmap({ name: "gp", dataDir: join(__dirname, "..", "..", "data/gp"), polling: Settings.polling });
		this.logchannel = new Enmap({ name: "logchannel", dataDir: join(__dirname, "..", "..", "data/logchannel"), polling: Settings.polling });
		this.tags = new Enmap({ name: "tags", dataDir: join(__dirname, "..", "..", "data/tags"), polling: Settings.polling });
		this.prefixes = new Enmap({ name: "prefixes", dataDir: join(__dirname, "..", "..", "data/prefixes"), polling: Settings.polling });
		this.blacklist = new Enmap({ name: "blacklist", dataDir: join(__dirname, "..", "..", "data/blacklist"), polling: Settings.polling });
		this.guilddata = new Enmap({ name: "guildata", dataDir: join(__dirname, "..", "..", "data/guilddata"), polling: Settings.polling });
		this.mutes = new Enmap({ name: "mutes", dataDir: join(__dirname, "..", "..", "data/mutes"), polling: Settings.polling });
		this.releases = new Enmap({ name: "releases", dataDir: join(__dirname, "..", "..", "data/releases"), polling: Settings.polling });
		this.infractions = new Enmap({ name: "infractions", dataDir: join(__dirname, "..", "..", "data/infractions"), polling: Settings.polling });
		this.UserData = new Enmap({ name: "users", dataDir: join(__dirname, "..", "..", "data/userData"), polling: Settings.polling });
	}

	public _init(): void {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});
		this.loadCommands();
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

declare module "discord-akairo" {
	interface AkairoClient {
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
		UserData: Enmap;
	}
}
