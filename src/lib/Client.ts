/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
	InhibitorHandler,
} from 'discord-akairo';
import { logger } from './exports/Logger';
import { setting, credentials, consts } from '../settings';
import TaskHandler from './taskhandler';
import BotLists from './BotLists';
import { Logger } from 'winston';
import { join } from 'path';
import Enmap from 'enmap';
declare module 'discord-akairo' {
	interface AkairoClient {
		settings: any;
		credentials: any;
		consts: any;
		logger: Logger;
		tags: Enmap;
		prefixes: Enmap;
		blacklist: Enmap;
		releases: Enmap;
		logchannel: Enmap;
		infractions: Enmap;
		ColorNames: Enmap;
		gp: Enmap;
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
		directory: join(__dirname, '..', 'Commands'),
		prefix: (message) => {
			if (message.guild !== null) this.prefixes.ensure(message.guild.id, {});
			if (
				message.guild == null ||
				!this.prefixes.get(message.guild.id, 'prefix')
			) {
				return [setting.prefix, 'malil'];
			} else {
				return [this.prefixes.get(message.guild.id, 'prefix'), 'malil'];
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
				modifyStart: (_, str): string =>
					`${str}\n\nType \`cancel\` to cancel the commmand`,
				modifyRetry: (_, str): string =>
					`${str}\n\nType \`cancel\` to cancel the commmand`,
				timeout: 'You took too long, the command has been cancelled now.',
				ended:
					'You exceeded the maximum amout of tries, this command has now been cancelled.',
				cancel: 'This command has been cancelled now.',
				retries: 3,
				time: 30000,
			},
			otherwise: '',
		},
	});
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, '..', 'Listeners'),
	});

	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, '..', 'Inhibitors'),
		automateCategories: true,
	});

	public taskHandler: TaskHandler = new TaskHandler(this, {
		directory: join(),
	});

	public botLists: BotLists = new BotLists(this, {
		topgg: credentials.bottokens.topgg,
		discordbotlist: credentials.bottokens.discordbotlist,
		bladebotlist: credentials.bottokens.Bladebnots,
		discordextremelist: credentials.bottokens.discordextreme,
		botsgg: credentials.bottokens.botsgg,
		verbose: true,
	});

	public config: Option;

	public constructor(config: Option) {
		// @ts-ignore
		super({
			ownerID: config.owners,
			superUserID: config.superUsers,
			intents: [
				'GUILDS',
				'GUILD_MESSAGES',
				'GUILD_MEMBERS',
				'GUILD_WEBHOOKS',
				'GUILD_INTEGRATIONS',
				'GUILD_MESSAGE_REACTIONS',
			],
			partials: ['CHANNEL', 'REACTION'],
		});
		this.settings = setting;
		this.consts = consts;
		this.credentials = credentials;
		this.config = config;
		this.logger = logger;
		this.logchannel = new Enmap({
			name: 'logchannel',
			dataDir: join(__dirname, '..', '..', 'data/logchannel'),
			polling: true,
		});
		this.tags = new Enmap({
			name: 'tags',
			dataDir: join(__dirname, '..', '..', 'data/tags'),
			polling: true,
		});
		this.prefixes = new Enmap({
			name: 'prefixes',
			dataDir: join(__dirname, '..', '..', 'data/prefixes'),
			polling: true,
		});
		this.blacklist = new Enmap({
			name: 'blacklist',
			dataDir: join(__dirname, '..', '..', 'data/blacklist'),
			polling: true,
		});
		this.releases = new Enmap({
			name: 'releases',
			dataDir: join(__dirname, '..', '..', 'data/releases'),
			polling: true,
		});
		this.infractions = new Enmap({
			name: 'infractions',
			dataDir: join(__dirname, '..', '..', 'data/infractions'),
			polling: true,
		});
		this.gp = new Enmap({
			name: 'gp',
			dataDir: join(__dirname, '..', '..', 'data/gp'),
			polling: true,
		});
		this.UserData = new Enmap({
			name: 'users',
			dataDir: join(__dirname, '..', '..', 'data/userData'),
			polling: true,
		});
	}

	public _init() {
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

	public async goo() {
		await this._init();
		return this.login(this.config.token);
	}
}
