import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { red, blue, gray, yellow, green, magenta, cyan, hex } from 'chalk';
import { credentials, Settings } from '../settings';
import centra from 'centra';
import { Message, Client, GuildMember } from 'discord.js';
const site = 'https://hst.sh/';
const { dev } = Settings;
const num = Math.floor(Math.random() * 2 + 1);
let main, sec, third, fourth, a1, split;

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

export async function fixspace(
	input: string | number,
	target: number
): Promise<string> {
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
