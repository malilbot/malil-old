import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { red, blue, gray, yellow, green, magenta, cyan, hex } from 'chalk';
import { credentials, Settings } from '../settings';
import centra from 'centra';
import { exec } from 'child_process';
import { Message, Client, GuildMember } from 'discord.js';
const site = 'https://hst.sh/';
const { dev } = Settings;
const num = Math.floor(Math.random() * 2 + 1);
let main, sec, third, fourth, a1, split;

/** oS utils taken from https://github.com/oscmejia/os-utils under the mit license */
const _os = require('os');

export const platform = function () {
	return process.platform;
};

export const cpuCount = function () {
	return _os.cpus().length;
};

export const sysUptime = function () {
	//seconds
	return _os.uptime();
};

export const processUptime = function () {
	//seconds
	return process.uptime();
};

// Memory
export const freemem = function () {
	return _os.freemem() / (1024 * 1024);
};

export const totalmem = function () {
	return _os.totalmem() / (1024 * 1024);
};

export const freememPercentage = function () {
	return _os.freemem() / _os.totalmem();
};

export const freeCommand = function (callback) {
	// Only Linux
	exec('free -m', function (error, stdout, stderr) {
		const lines = stdout.split('\n');

		const str_mem_info = lines[1].replace(/[\s\n\r]+/g, ' ');

		const mem_info = str_mem_info.split(' ');

		const total_mem = parseFloat(mem_info[1]);
		const free_mem = parseFloat(mem_info[3]);
		const buffers_mem = parseFloat(mem_info[5]);
		const cached_mem = parseFloat(mem_info[6]);

		const used_mem = total_mem - (free_mem + buffers_mem + cached_mem);

		callback(used_mem - 2);
	});
};

// Hard Disk Drive

// Return process running current
export const getProcesses = function (nProcess, callback) {
	// if nprocess is undefined then is function
	if (typeof nProcess === 'function') {
		callback = nProcess;
		nProcess = 0;
	}

	let command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + 10;
	//command = 'ps aux | head -n '+ 11
	//command = 'ps aux | head -n '+ (nProcess + 1)
	if (nProcess > 0)
		command =
			'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + (nProcess + 1);

	exec(command, function (error, stdout) {
		const that = this;

		const lines = stdout.split('\n');
		lines.shift();
		lines.pop();

		let result = '';

		lines.forEach(function (_item, _i) {
			const __str = _item.replace(/[\s\n\r]+/g, ' ');

			const _str = __str.split(' ');

			// result += _str[10]+" "+_str[9]+" "+_str[2]+" "+_str[3]+"\n";  // process
			result +=
				_str[1] +
				' ' +
				_str[2] +
				' ' +
				_str[3] +
				' ' +
				_str[4].substring(_str[4].length - 25) +
				'\n'; // process
		});

		callback(result);
	});
};

/*
 * Returns All the load average usage for 1, 5 or 15 minutes.
 */
export const allLoadavg = function () {
	const loads = _os.loadavg();

	return (
		loads[0].toFixed(4) + ',' + loads[1].toFixed(4) + ',' + loads[2].toFixed(4)
	);
};

/*
 * Returns the load average usage for 1, 5 or 15 minutes.
 */
export const loadavg = function (_time) {
	if (_time === undefined || (_time !== 5 && _time !== 15)) _time = 1;

	const loads = _os.loadavg();
	let v = 0;
	if (_time == 1) v = loads[0];
	if (_time == 5) v = loads[1];
	if (_time == 15) v = loads[2];

	return v;
};

export const cpuFree = function (callback) {
	getCPUUsage(callback, true);
};

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
	var total = 0;

	for (const cpu in cpus) {
		if (!cpus.hasOwnProperty(cpu)) continue;
		user += cpus[cpu].times.user;
		nice += cpus[cpu].times.nice;
		sys += cpus[cpu].times.sys;
		irq += cpus[cpu].times.irq;
		idle += cpus[cpu].times.idle;
	}

	var total = user + nice + sys + idle + irq;

	return {
		idle: idle,
		total: total,
	};
}

export async function fixword(input: string): Promise<string> {
	input = input
		.replace(/nig+ger/gi, '')
		.replace(/nig+ga/gi, '')
		.replace(/retard/gi, '')
		.replace(/cock/gi, '');
	return input;
}

if (dev == true) {
	if (num == 1) {
		a1 = gray;
		main = red;
		sec = yellow;
		third = cyan;
		fourth = green;
		split = gray(' - ');
	} else {
		a1 = red;
		main = hex('#205d77');
		sec = magenta;
		third = blue;
		fourth = gray;
		split = green(' - ');
	}
} else {
	if (num == 1) {
		a1 = yellow;
		main = blue;
		sec = green;
		third = magenta;
		fourth = cyan;
		split = yellow(' - ');
	} else {
		a1 = green;
		main = cyan;
		sec = magenta;
		third = red;
		fourth = gray;
		split = blue(' - ');
	}
}

export function fixspace(input: string | number, target: number): string {
	input = input.toString();
	if (input.length > target) return input;
	const spaces = target - input.length;
	for (let i = 0; i < spaces; i++) {
		input = input += ' ';
	}
	return input;
}
export class Util {
	formatBytes(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
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
		return res.join(':');
	}
}
export const GetUser = async function (
	msg: Message,
	client: Client
): Promise<GuildMember> {
	let user;

	const stuff = msg.content.split(' ');

	stuff.forEach((element) => {
		user = msg.guild.members.cache.find((member) => {
			return (
				member.displayName.toLowerCase().includes(element) ||
				member.user.tag.toLowerCase().includes(element)
			);
		});
	});
	stuff.forEach((element) => {
		const person = msg.guild.members.cache.get(element);
		if (person !== (null || undefined) && !user) user = person;
	});
	if (!user) {
		if (msg.mentions.users.last()) {
			if (msg.mentions.users.last().id !== client.user.id) {
				user = msg.mentions.users.last();
			}
		}
	}
	if (!user) {
		if (msg.content.includes('^') && msg.channel.messages.cache.size >= 4) {
			user = msg.channel.messages.cache
				.filter((m) => m.id < msg.id && m.author.id != msg.author.id)
				.last().member as GuildMember;
		}
	}

	if (user && user.id) user = msg.guild.members.fetch(user.id);
	return user || null;
};
export const GetSelf = async function (
	msg: Message,
	client: Client
): Promise<GuildMember> {
	let user;

	const stuff = msg.content.split(' ');

	stuff.forEach((element) => {
		user = msg.guild.members.cache.find((member) => {
			return (
				member.displayName.toLowerCase().includes(element) ||
				member.user.tag.toLowerCase().includes(element)
			);
		});
	});
	stuff.forEach((element) => {
		const person = msg.guild.members.cache.get(element);
		if (person !== (null || undefined) && !user) user = person;
	});
	if (!user) {
		if (msg.mentions.users.last()) {
			if (msg.mentions.users.last().id !== client.user.id) {
				user = msg.mentions.users.last();
			}
		}
	}
	if (!user) {
		if (msg.content.includes('^') && msg.channel.messages.cache.size >= 4) {
			user = msg.channel.messages.cache
				.filter((m) => m.id < msg.id && m.author.id != msg.author.id)
				.last().member as GuildMember;
		}
	}

	if (user && user.id) user = msg.guild.members.fetch(user.id);
	return user || msg.member;
};

export const CreateGist = async function (
	name: string,
	content: string,
	client: InterfaceClient
): Promise<string> {
	const files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || 'oops something went wrong :(',
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	const gist = await (
		await centra('https://api.github.com/gists', 'POST')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.body(body, 'json')
			.send()
	).json();
	const out = `${gist.id}`;
	return out;
};
export const EditGist = async function (
	name: string,
	content: string,
	GistId: string,
	client: InterfaceClient
): Promise<gistif> {
	const files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || 'oops something went wrong :(',
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	const gist = await (
		await centra('https://api.github.com/gists/' + GistId, 'POST')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.body(body, 'json')
			.send()
	).json();
	return gist;
};
export const GetGist = async function (
	GistId: string,
	client: InterfaceClient
): Promise<gistif> {
	const gist = await (
		await centra('https://api.github.com/gists/' + GistId, 'GET')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.send()
	).json();
	console.log(gist);
	return gist;
};

export async function hst(body: string): Promise<string> {
	const post = await (
		await centra(site + 'documents', 'POST')
			.body(body)
			.send()
	).json();
	return site + post.key;
}

function replace(msg: string) {
	return msg
		.replace('[ GOING OVER GUILDS ]', sec('[ GOING OVER GUILDS ]'))
		.replace('[ SHARD ]', sec('[ STARTING SHARD ]'))
		.replace('[ MAXSHARDS ]', third('[ SHARDING DONE ]'));
}
const { combine, timestamp, printf } = format;
export const logger = createLogger({
	level: 'info',
	format: combine(
		timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
		printf((info): string => {
			const { message } = info;
			return a1(replace(message));
		})
	),

	transports: [
		new transports.Console({
			level: 'info',
		}),
		new DailyRotateFile({
			format: combine(timestamp()),
			level: 'debug',
			zippedArchive: true,
			extension: '.log',
			filename: './Logs/malil-%DATE%',
			maxFiles: '14d',
		}),
	],
});
export const sleep = async function (
	ms: number | string
): Promise<string | number> {
	let mis: number;
	if (typeof ms !== 'number') {
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
}
export { main, sec, third, fourth, a1, split };
