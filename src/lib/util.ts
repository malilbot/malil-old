import { red, blue, gray, yellow, green, magenta, cyan, hex } from "chalk";
import { createLogger, transports, format, Logger } from "winston";
import { Message, Client, GuildMember, GuildChannel, TextChannel, MessageEmbed } from "discord.js";
import DailyRotateFile from "winston-daily-rotate-file";
import { credentials, Settings, consts } from "../settings";
import { Command } from "discord-akairo";
import centra from "centra";
import Enmap from "enmap";
//import { client } from "../lib/bot";
import os from "os";
import { join } from "path";
/** Pre defining */

const num = Math.floor(Math.random() * 2 + 1);
const { combine, timestamp, printf } = format;
let main, sec, third, fourth, a1, split;
const site = "https://hst.sh/";
const { dev } = Settings;
const _os = os;
const prefixes = new Enmap({
	name: "prefixes",
	dataDir: join(__dirname, "..", "..", "data/prefixes"),
	polling: true,
});

export function Format(msg: Message, Cmd?: Command, missing?: string[], reason?: string): FormatIF {
	let mis: string;
	let cmd = main(Cmd);
	let usr = sec(msg?.author.tag) + " " + fourth(msg.author.id);
	let gld = sec(msg?.guild.name) + " " + fourth(msg.guild.id);
	if (missing && missing[0]) {
		mis = main(missing[0]?.toLowerCase().replace(/_/g, " "));
	}
	let rsn = third(reason);
	if (cmd == undefined) cmd = null;
	if (usr == undefined) usr = null;
	if (gld == undefined) gld = null;
	if (mis == undefined) mis = null;
	if (rsn == undefined) rsn = null;
	return {
		CStr: cmd,
		UStr: usr,
		GStr: gld,
		MStr: mis,
		RStr: rsn,
	};
}

/** code taken from ms https://github.com/vercel/ms */

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

export const ms = function (val: any, options?: any): any {
	options = options || {};
	const type = typeof val;
	if (type === "string" && val.length > 0) {
		return parse(val);
	} else if (type === "number" && isFinite(val)) {
		return options.long ? fmtLong(val) : fmtShort(val);
	}
	throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};

function parse(str) {
	str = String(str);
	if (str.length > 100) {
		return;
	}
	const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		str
	);
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

/** oS utils taken from https://github.com/oscmejia/os-utils under the mit license */

export const cpuUsage = function (callback) {
	getCPUUsage(callback, false);
};

function getCPUUsage(callback, free) {
	const stats1 = getCPUInfo();
	const startIdle = stats1.idle;
	const startTotal = stats1.total;

	setTimeout(function () {
		const stats2 = getCPUInfo();
		const endIdle = stats2.idle;
		const endTotal = stats2.total;

		const idle = endIdle - startIdle;
		const total = endTotal - startTotal;
		const perc = idle / total;

		if (free === true) callback(perc);
		else callback(1 - perc);
	}, 1000);
}

function getCPUInfo() {
	const cpus = _os.cpus();

	let user = 0;
	let nice = 0;
	let sys = 0;
	let idle = 0;
	let irq = 0;

	for (const cpu in cpus) {
		if (!cpus.hasOwnProperty(cpu)) continue;
		user += cpus[cpu].times.user;
		nice += cpus[cpu].times.nice;
		sys += cpus[cpu].times.sys;
		irq += cpus[cpu].times.irq;
		idle += cpus[cpu].times.idle;
	}

	const totals = user + nice + sys + idle + irq;

	return {
		idle: idle,
		total: totals,
	};
}

export async function fixword(input: string): Promise<string> {
	input = input
		.replace(/nig+ger/gi, "")
		.replace(/nig+ga/gi, "")
		.replace(/retard/gi, "")
		.replace(/cock/gi, "");
	return input;
}

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
		main = hex("#205d77");
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
export const GetMember = async function (msg: Message, args?: string): Promise<GuildMember> {
	let user: GuildMember;
	const _mentions = [];

	for (const mentions of msg.mentions.users) {
		_mentions.push(mentions[1].id);
	}
	/** Checking if there are 2 mentions */
	if (_mentions[1]) {
		if (_mentions[0] !== _mentions[1]) return msg.mentions.members.last();
	}

	const id = msg.guild.me.user.id;
	const _content = msg.content.replace(id, "");
	if (_content.includes(id)) {
		return msg.mentions.members.last();
	}
	const prefix = prefixes.get(msg.guild.id, "prefix");
	if (args) {
		msg.content = args;
	} else {
		/** stripping useless stuff */
		if (msg.content?.startsWith(`<@!${id}>`)) msg.content = msg.content.replace(new RegExp(`<@!${id}>`), "");
		else if (msg.content?.startsWith("malil")) msg.content = msg.content.replace("malil", "");
		else if (msg.content?.startsWith(prefix)) msg.content = msg.content.replace(prefix, "");
		msg.content = msg.content.split(" ").splice(1).join(" ");
	}
	/**Defining what to search for */
	const item = msg.content.split(" ")[0];
	if (!item) return null;
	if (item == "^" && msg.channel.messages.cache.size >= 4) {
		user = msg.channel.messages.cache.filter((m) => m.id < msg.id && m.author.id != msg.author.id).last().member as GuildMember;
	}
	if (item == "^" && msg.channel.messages.cache.size <= 4) return null;
	if (item == "me") return msg.member;
	user = msg.guild.members.cache.get(item);
	if (!user) {
		try {
			user = await msg.guild.members.fetch(item);
		} catch (e) {
			user = msg.guild.members.cache.find((member) => {
				return member.displayName.toLowerCase().includes(item) || member.user.tag.toLowerCase().includes(item);
			});
		}
	}

	return user || null;
};

export const CreateGist = async function (name: string, content: string, client: InterfaceClient): Promise<string> {
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
		await centra("https://api.github.com/gists", "POST")
			.header("User-Agent", "Malil")
			.header("Authorization", `token ${client.credentials.gist}`)
			.body(body, "json")
			.send()
	).json();
	const out = `${gist.id}`;
	return out;
};
export const EditGist = async function (name: string, content: string, GistId: string, client: InterfaceClient): Promise<gistif> {
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
		await centra("https://api.github.com/gists/" + GistId, "POST")
			.header("User-Agent", "Malil")
			.header("Authorization", `token ${client.credentials.gist}`)
			.body(body, "json")
			.send()
	).json();
	return gist;
};
export const GetGist = async function (GistId: string, client: InterfaceClient): Promise<gistif> {
	const gist = await (
		await centra("https://api.github.com/gists/" + GistId, "GET")
			.header("User-Agent", "Malil")
			.header("Authorization", `token ${client.credentials.gist}`)
			.send()
	).json();
	return gist;
};

export async function hst(body: string): Promise<string> {
	const post = await (
		await centra(site + "documents", "POST")
			.body(body)
			.send()
	).json();
	return site + post.key;
}

function replace(msg: string) {
	return msg
		.replace("[ GOING OVER GUILDS ]", sec("[ GOING OVER GUILDS ]"))
		.replace("[ SHARD ]", sec("[ STARTING SHARD ]"))
		.replace("[ MAXSHARDS ]", third("[ SHARDING DONE ]"));
}
export async function Infract(
	message?: Message,
	reason?: string,
	member?: GuildMember,
	type?: string,
	client?: InterfaceClient
): Promise<void> {
	if (type !== "UNMUTE") {
		const usID = member.id;
		client.infractions.ensure(message.guild.id, { [usID]: {} });
		const infraction = client.infractions.get(message.guild.id, usID);
		const _log = {
			who: message.author.tag,
			reason: reason,
			type: type,
		};
		infraction[Date.now()] = _log;
		client.infractions.set(message.guild.id, infraction, usID);
	}

	if (client.logchannel.get(member.guild.id)) {
		if (((await client.channels.fetch(client.logchannel.get(member.guild.id))) as GuildChannel).deleted == false) {
			const embed = new MessageEmbed();
			if (type == "KICK") {
				embed.setAuthor(`User Kicked by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nReason ${reason}`);
				embed.setColor(client.consts.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
				embed.setTimestamp();
			} else if (type == "BAN") {
				embed.setAuthor(`User Banned by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nReason ${reason}`);
				embed.setColor(client.consts.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
				embed.setTimestamp();
			} else if (type == "MUTE") {
				embed.setAuthor(`User Muted by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`Member: ${member.user.tag}\nTime ${ms(ms(reason), { long: true })}`);
				embed.setColor(client.consts.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
				embed.setTimestamp();
			} else if (type == "UNMUTE") {
				embed.setDescription(`Unmuted ${member.user.tag}\n Reason: Mute duration expired.`);
				embed.setColor(client.consts.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
				embed.setTimestamp();
			} else if (type == "STAFFUNMUTE") {
				embed.setAuthor(`User Muted by ${message.author.tag}`, message.author.avatarURL());
				embed.setDescription(`unmuted ${member.user.tag}\n Reason: Manually unmuted by staff`);
				embed.setColor(client.consts.colors.red);
				embed.setFooter(`User id: ${member.user.id}`);
				embed.setTimestamp();
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
export const logger = createLogger({
	level: "info",
	format: combine(
		timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
		printf((info): string => {
			const { message } = info;
			return a1(replace(message));
		})
	),

	transports: [
		new transports.Console({
			level: "info",
		}),
		new DailyRotateFile({
			format: combine(timestamp()),
			level: "debug",
			zippedArchive: true,
			extension: ".log",
			filename: "./Logs/malil-%DATE%",
			maxFiles: "14d",
		}),
	],
});
export const sleep = async function (ms: number | string): Promise<string | number> {
	let mis: number;
	if (typeof ms !== "number") {
		mis = Number(ms);
	}

	return new Promise((resolve) => {
		setTimeout(resolve, mis);
	});
};
interface gistif {
	url: string;
	forks_url: string;
	commits_url: string;
	id: string;
	node_id: string;
	git_pull_url: string;
	git_push_url: string;
	html_url: string;
	files: any;
}
class InterfaceClient extends Client {
	public credentials = credentials;
	public consts = consts;
	public logchannel: any;
	public infractions: any;
	public logger: Logger;
}
interface FormatIF {
	GStr: string;
	UStr: string;
	CStr: string;
	MStr: string;
	RStr: string;
}
export { main, sec, third, fourth, a1, split };
