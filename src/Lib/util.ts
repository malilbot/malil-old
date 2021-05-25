/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, GuildMember, GuildChannel, TextChannel, MessageEmbed, Interaction } from "discord.js";
import { Command } from "discord-akairo";
import { red, blue, gray, yellow, green, magenta, cyan, bgBlueBright, bgGreen, bgCyan, black } from "chalk";
import { Settings } from "../settings";
export { consts } from "../settings";
import cio from "cheerio";
import InterfaceClient from "../Classes/Client";
import petitio from "petitio";
import moment from "moment";
/** Pre defining */
const num = Math.floor(Math.random() * 2 + 1);

export let main: (string: string | Command | number) => string,
	sec: (string: string | Command | number) => string,
	third: (string: string | Command | number) => string,
	fourth: (string: string | Command | number) => string,
	a1: (string: string | Command | number) => string,
	split: string;
const site = "https://hst.sh/";
const { dev } = Settings;

export const logger = new (class Logger {
	dash: string;
	Verbose: boolean;
	lightBlue: (string: string | Command | number | string[]) => string;
	red: (string: string | Command | number | string[]) => string;
	darkBlue: (string: string | Command | number | string[]) => string;
	orange: (string: string | Command | number | string[]) => string;
	yellow: (string: string | Command | number | string[]) => string;
	konsole: (content, { colors, level }: { colors: string[]; level?: number }) => void;
	constructor(verbose: boolean) {
		this.Verbose = verbose;
		this.lightBlue = green; //hex("#72bcd4");
		this.red = red; //hex("#B20000");
		this.darkBlue = green; //hex("#14eff9");
		this.orange = gray; //hex("#FF4F00");
		this.yellow = yellow; //hex("ccf914");
		this.dash = this.lightBlue(" - ");
		this.konsole = (content, { colors, level }: { colors: string[]; level?: number }) => {
			const time = moment().format("HH:mm");
			let message = `${this[colors[0]](time)}`;
			if (level) message += `${this[colors[1]](`level: ${this[colors[0]](level)}`)} `;
			message += `${this.dash}${this[colors[2]](content)}`;

			console.log(message);
		};
	}
	warn(content: string | number | Command | string[], level?: number): void {
		this.konsole(content, { level, colors: ["orange", "red", "yellow"] });
	}
	verbose(content: string | number | Command | string[], level?: number): void {
		if (!this.Verbose) return;
		this.konsole(content, { level, colors: ["orange", "darkBlue", "yellow"] });
	}
	info(content: string | number | Command | string[]): void {
		this.konsole(content, { colors: ["darkBlue", "yellow", "yellow"] });
	}
	log(content: string | number | Command | string[]): void {
		this.konsole(content, { colors: ["darkBlue", "yellow", "yellow"] });
	}
	command(message: Message | Interaction, command: Command, trigger: string) {
		if (trigger == "Success") {
			trigger = green(trigger);
		} else if (trigger == "blocked") {
			trigger = red(trigger);
		}
		console.log(
			bgBlueBright(`${black(moment().format("HH:mm"))}`) +
				` => [Command: ${black(green(`${command}`))} - ${trigger}]` +
				` by ${black(bgGreen(`${((message as Interaction).user || (message as Message).author).tag}(${(message as Message).author.id})`))}` +
				` in ${black(bgCyan(`${message.guild.name}(${message.guild.id})`))}`
		);
	}
})(Settings.verbose);

/** code taken from ms https://github.com/vercel/ms */

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ms = function (val: string | number, options?: any): any {
	options = options || {};
	const type = typeof val;
	if (type === "string" && (val as string).length > 0) {
		return parse(val);
	} else if (type === "number" && isFinite(val as number)) {
		return options.long ? fmtLong(val) : fmtShort(val);
	}
	return null;
};

function parse(str) {
	str = String(str);
	if (str.length > 100) {
		return;
	}
	const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
	if (!match) {
		return;
	}
	const n = parseFloat(match[1]);
	const type = (match[2] || "ms").toLowerCase();
	switch (type) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			return n * y;
		case "weeks":
		case "week":
		case "w":
			return n * w;
		case "days":
		case "day":
		case "d":
			return n * d;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			return n * h;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			return n * m;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			return n * s;
		case "milliseconds":
		case "millisecond":
		case "msecs":
		case "msec":
		case "ms":
			return n;
		default:
			return undefined;
	}
}

function fmtShort(ms) {
	const msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return Math.round(ms / d) + "d";
	}
	if (msAbs >= h) {
		return Math.round(ms / h) + "h";
	}
	if (msAbs >= m) {
		return Math.round(ms / m) + "m";
	}
	if (msAbs >= s) {
		return Math.round(ms / s) + "s";
	}
	return ms + "ms";
}

function fmtLong(ms) {
	const msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return plural(ms, msAbs, d, "day");
	}
	if (msAbs >= h) {
		return plural(ms, msAbs, h, "hour");
	}
	if (msAbs >= m) {
		return plural(ms, msAbs, m, "minute");
	}
	if (msAbs >= s) {
		return plural(ms, msAbs, s, "second");
	}
	return ms + " ms";
}

function plural(ms, msAbs, n, name) {
	const isPlural = msAbs >= n * 1.5;
	return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}
/**
 * Function that filters text sorry for the bad words please forgive me lol
 * @param input string to fix
 * @returns returns "cleanised" text
 */
export function fixword(input: string): string {
	input = input
		.replace(/nig+ger/gi, "")
		.replace(/nig+ga/gi, "")
		.replace(/retard/gi, "")
		.replace(/cock/gi, "");
	return input;
}

//async function GetLang(msg: Message, sentence: sentences, ...ARGS) {}

if (dev == true) {
	if (num == 1) {
		a1 = gray;
		main = red;
		sec = yellow;
		third = cyan;
		fourth = green;
		split = gray(" - ");
	} else {
		a1 = red;
		main = blue;
		sec = magenta;
		third = blue;
		fourth = gray;
		split = green(" - ");
	}
} else {
	if (num == 1) {
		a1 = yellow;
		main = blue;
		sec = green;
		third = magenta;
		fourth = cyan;
		split = yellow(" - ");
	} else {
		a1 = green;
		main = cyan;
		sec = magenta;
		third = red;
		fourth = gray;
		split = blue(" - ");
	}
}

export function fixspace(input: string | number, target: number): string {
	input = input.toString();
	if (input.length > target) return input;
	const spaces = target - input.length;
	for (let i = 0; i < spaces; i++) {
		input = input += " ";
	}
	return input;
}
export class Util {
	formatBytes(bytes: number): string {
		if (bytes === 0) return "0 Bytes";
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	formatTime(ms: number): string {
		const time = {
			d: 0,
			h: 0,
			m: 0,
			s: 0,
		};
		time.s = Math.floor(ms / 1000);
		time.m = Math.floor(time.s / 60);
		time.s %= 60;
		time.h = Math.floor(time.m / 60);
		time.m %= 60;
		time.d = Math.floor(time.h / 24);
		time.h %= 24;

		const res = [];
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [k, v] of Object.entries(time)) {
			let first = false;
			if (v < 1 && !first) continue;

			res.push(v < 10 ? `0${v}` : `${v}`);
			first = true;
		}
		return res.join(":");
	}
}
/**
 *
 * @param msg - Message Object used to get prefix etc;
 * @param args - args used to be more precise
 * @returns - returns a GuildMember object
 */
export const GetMember = async function (msg: Message, args: string): Promise<GuildMember> {
	/**Defining what to search for */
	const item = args.trim().split(" ")[0];

	const reg = /<@!?(\d{17,19})>/;
	const id = args.match(reg);

	if (!item && !id) return null;
	else if (item == "^" && msg.channel.messages.cache.size >= 4) return msg.channel.messages.cache.filter((m) => m.id < msg.id && m.author?.id != msg.author?.id).last().member;
	else if (item == "^") return null;

	let user = msg.guild.members.cache.find((member) => {
		if (member.id == item) return true;
		if (id && member.id == id[1]) return true;
		if (member.displayName.toLowerCase().includes(item)) return true;
		if (member.user.tag.toLowerCase().includes(item)) return true;
	});
	if (user) return user;
	if (id && id[1]) {
		try {
			logger.info(a1("[ FETCHING USER ] ") + main(`[ BY ] ${msg.author.tag}`) + main(` [ TEXT ] ${id}`));
			user = await msg.guild.members.fetch(id[1]);
		} catch (e) {}
	}

	return user;
};

// Code "borrowed" from :https://github.com/farshed/genius-lyrics-api

const getTitle = (title: string | number | boolean, artist: string | number | boolean): string => {
	return `${title} ${artist}`
		.toLowerCase()
		.replace(/ *\([^)]*\) */g, "")
		.replace(/ *\[[^\]]*]/, "")
		.replace(/feat.|ft./g, "")
		.replace(/\s+/g, " ")
		.trim();
};

/**
 * @param {string} url - Genius URL
 */
async function extractLyrics(url: string): Promise<string> {
	const { body } = await petitio(url).send();
	const $ = cio.load(body);
	let lyrics = $('div[class="lyrics"]').text().trim();
	if (!lyrics) {
		lyrics = "";
		$('div[class^="Lyrics__Container"]').each((i, elem) => {
			if ($(elem).text().length !== 0) {
				const snippet = $(elem)
					.html()
					.replace(/<br>/g, "\n")
					.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
				lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
			}
		});
	}
	if (!lyrics) return null;
	return lyrics.trim();
}

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
export async function GetSong(options: {
	apiKey: string;
	title: string | number | boolean;
	artist: string | number | true;
	optimizeQuery: boolean;
}): Promise<{ id: string; url: string; lyrics: string; albumArt: string }> {
	const results = await searchSong(options);
	if (!results) return null;
	const lyrics = await extractLyrics(results[0].url);
	return {
		id: results[0].id,
		url: results[0].url,
		lyrics,
		albumArt: results[0].albumArt,
	};
}

const searchUrl = "https://api.genius.com/search?q=";

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
async function searchSong(options: {
	apiKey: string;
	title: string | number | boolean;
	artist: string | number | true;
	optimizeQuery: boolean;
}): Promise<{ apiKey: string; title: string; artist: string; optimizeQuery: boolean }> {
	const { apiKey, title, artist, optimizeQuery = false } = options;
	const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
	const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;

	const res = await (
		await petitio(reqUrl, "GET")
			.header("Authorization", "Bearer " + apiKey)
			.send()
	).json();
	if (res.response.hits.length === 0) return null;
	const results = res.response.hits.map((val) => {
		const { full_title, song_art_image_url, id, url } = val.result;
		return { id, title: full_title, albumArt: song_art_image_url, url };
	});
	return results;
}

/*
import { readFileSync } from "fs";

let commit: string;

export const getCommitHash = (): string => {
	if (commit) return commit.slice(0, 7);
	const hash = readFileSync(".git/HEAD")
		.toString()
		.trim()
		.split(/.*[: ]/)
		.slice(-1)[0];
	if (hash.indexOf("/") == -1) {
		commit = hash;
		return commit.slice(0, 7);
	} else {
		commit = readFileSync(".git/" + hash)
			.toString()
			.trim();
		return commit.slice(0, 7);
	}
};
*/
export async function CreateGist(name: string, content: string, client: InterfaceClient): Promise<string> {
	logger.info(a1("[ CREATING GIST ] ") + main(`NAME ${name}`));
	const files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || "oops something went wrong :(",
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	const gist = await (
		await petitio("https://api.github.com/gists", "POST").header("User-Agent", "Malil").header("Authorization", `token ${client.credentials.github}`).body(body, "json").send()
	).json();
	const out = `${gist.id}`;
	return out;
}
export async function EditGist(name: string, content: string, GistId: string, client: InterfaceClient): Promise<gistif> {
	logger.info(a1("[ EDITING GIST ] ") + main(`NAME ${name}`));
	const files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || "oops something went wrong :(",
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	const gist = await (
		await petitio("https://api.github.com/gists/" + GistId, "POST")
			.header("User-Agent", "Malil")
			.header("Authorization", `token ${client.credentials.github}`)
			.body(body, "json")
			.send()
	).json();
	return gist;
}
export const GetGist = async function (GistId: string, client: InterfaceClient): Promise<gistif> {
	logger.info(a1("[ GETTING GIST ] ") + main(`NAME ${name}`));
	const gist = await (
		await petitio("https://api.github.com/gists/" + GistId, "GET")
			.header("User-Agent", "Malil")
			.header("Authorization", `token ${client.credentials.github}`)
			.send()
	).json();
	return gist;
};

const urls = [
	"https://hst.sh",
	"https://hasteb.in",
	"https://hastebin.com",
	"https://mystb.in",
	"https://haste.clicksminuteper.net",
	"https://paste.pythondiscord.com",
	"https://haste.unbelievaboat.com",
];
const post = async (contents: string) => {
	for (const url of urls) {
		try {
			const res: hastebinRes = await (
				await petitio(site + "documents", "POST")
					.body(contents)
					.send()
			).json();
			return `${url}/${res.key}`;
		} catch (e) {
			continue;
		}
	}
};
/*
const post = async (contents: string) => {
	return await (
		await petitio(site + "documents", "POST")
			.body(contents)
			.send()
	).json();
};
*/
export function hst(body: string, check = false): Promise<string> | string {
	logger.info(a1("[ POSTING ON hst.sh ] "));
	if (check) {
		if (body.length > 1024) {
			return post(body);
		} else {
			return body;
		}
	}

	return post(body);
}
export async function Infract(message?: Message, reason?: string, member?: GuildMember, type?: string, client?: InterfaceClient): Promise<void> {
	logger.info(sec("[ GIVING OUT A INFRACTION ] ") + main(`[ TO ] ${member.user.tag || "noone? huh what"} `) + third(`[ TYPE ] ${type || "no type? wtf"}`));
	if (type.toLowerCase() !== "unmute" && member && message && type) {
		client.createInfraction(member.id, message.id, member.guild.id, message.author.id, reason || "No reason provided", type || "No type");
	}

	if (client.logchannel.get(member.guild.id)) {
		if ((client.channels.cache.get(client.logchannel.get(member.guild.id)) as GuildChannel).deleted == false) {
			const embed = new MessageEmbed().setTimestamp();

			if (type == "KICK") {
				embed.setAuthor(`User Kicked by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nReason ${reason || "No reason provided."}`);
				embed.setColor(client.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
			} else if (type == "BAN") {
				embed.setAuthor(`User Banned by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nReason ${reason || "No reason provided."}`);
				embed.setColor(client.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
			} else if (type == "WARN") {
				embed.setAuthor(`User Warned by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nReason ${reason || "No reason provided."}`);
				embed.setColor(client.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
			} else if (type == "MUTE") {
				embed.setAuthor(`User Muted by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nTime ${ms(ms(reason || "No reason provided."), { long: true }) || "Perma"}`);
				embed.setColor(client.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
			} else if (type == "UNMUTE") {
				embed.setDescription(`Unmuted ${member.user.tag}\n Reason: Mute duration expired.`);
				embed.setColor(client.colors.green);
				embed.setFooter(`User id: ${member.user.id}`);
			} else if (type == "STAFFUNMUTE") {
				embed.setAuthor(`User Muted by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Unmuted ${member.user.tag}\n Reason: ${reason || "Manually unmuted by staff"}`);
				embed.setColor(client.colors.green);
				embed.setFooter(`User id: ${member.user.id}`);
			}
			const channel = (await client.channels.fetch(client.logchannel.get(member.guild.id))) as TextChannel;
			if (!channel || channel.deleted == true) {
				client.logchannel.set(member.guild.id, null);
				return;
			}
			channel.send(embed).catch(() => client.logchannel.set(member.guild.id, null));
		}
	}
}
/**
 *
 * @param client - Used to get values.
 * @returns - Returns a nice member object
 */
export async function FetchValues(client: InterfaceClient): Promise<{ guilds: number; users: number; channels: number }> {
	const totalGuilds = await client.shard.fetchClientValues("guilds.cache.size").then((servers) => servers.reduce((members: number, guildCount: number) => members + guildCount, 0));

	const totalMembers = await client.shard
		.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)")
		.then((member) => member.reduce((acc, memberCount) => acc + memberCount, 0));

	const totalChannels = await client.shard
		.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)")
		.then((channel) => channel.reduce((acc, channelCount) => acc + channelCount, 0));
	return { guilds: totalGuilds, users: totalMembers, channels: totalChannels };
}
/**
 *
 * @param client - Client to get values
 */
export function readyLog(client: InterfaceClient): void {
	const spaces = 20;

	const array = [
		//handlers
		fixspace(third("Commands"), spaces) + split + main(fixspace(client.commandHandler.modules.size, spaces)),
		fixspace(third("listeners"), spaces) + split + main(fixspace(client.listenerHandler.modules.size, spaces)),
		fixspace(third("Inhibitors"), spaces) + split + main(fixspace(client.inhibitorHandler.modules.size, spaces)),
		//bot stats
		fixspace(third("Guilds"), spaces) + split + main(fixspace(client.guilds.cache.size, spaces)),
		fixspace(third("Channels"), spaces) +
			split +
			main(
				fixspace(
					client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0),
					spaces
				)
			),
		fixspace(third("Members"), spaces) +
			split +
			main(
				fixspace(
					client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
					spaces
				)
			),
		// statuses
		fixspace(third("rpc"), spaces) + split + main(fixspace(`${Settings.rpc ? "" : ""}`, spaces)),
		fixspace(third("dev"), spaces) + split + main(fixspace(`${Settings.dev ? "" : ""}`, spaces)),
		fixspace(third("site"), spaces) + split + main(fixspace(`${Settings.site ? "" : ""}`, spaces)),
		fixspace(third("verbose"), spaces) + split + main(fixspace(`${Settings.verbose ? "" : ""}`, spaces)),
		fixspace(third("polling"), spaces) + split + main(fixspace(`${Settings.polling ? "" : ""}`, spaces)),
	];

	for (const i of array) logger.verbose(i);
}
/**
 *
 * @param ms - time to wait in micro seconds
 * @returns
 */
export const sleep = function (ms: number | string): Promise<string | number> {
	let mis: number;
	if (typeof ms !== "number") {
		mis = Number(ms);
	}

	return new Promise((resolve) => {
		setTimeout(resolve, mis);
	});
};

//note just replace all null's with nothing
//General

interface gistif {
	url: string;
	forks_url: string;
	commits_url: string;
	id: string;
	node_id: string;
	git_pull_url: string;
	git_push_url: string;
	html_url: string;
	files: string;
}

interface hastebinRes {
	key: string;
}

export interface malilStartGiveaway {
	winners: number;
	time: number;
	prize: string;
	options?: {
		roles?: string[];
		messages?: number;
		joindate?: number;
	};
	channel: string;
	message: string;
	guildId: string;
}
export interface fn {
	(...args: string[]): string;
}
export interface infraction {
	when: number;
	user: BigInt;
	id: BigInt;
	guild: BigInt;
	reason: string;
	type: string;
}
export interface guildSettingsInterface {
	id: bigint;
	muterole: bigint;
	modrole: bigint;
	github: bigint;
	modlogs: bigint;
	emoji: bigint;
	starboard: bigint;
	emojicount: number;
	stickers: boolean;
	prefix: any;
	githubchannel: bigint;
	language: number;
}
