import { join } from "path";
import { InterfaceClient, req, fourth, sec, sleep } from "../Lib/Utils";
import type { User, TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import { readFileSync } from "fs";
import Fastify, { FastifyInstance } from "fastify";
const fastify = Fastify({ logger: false });
export default class Server {
	online: boolean;
	port: number;
	topAuth: string;
	dbotsAuth: string;
	client: InterfaceClient;
	time: number;
	totalGuilds: number;
	totalMembers: number;
	totalChannels: number;
	constructor(client: InterfaceClient, { online = true, port = 3000, topAuth = "6969", dbotsAuth = "6969" }: { online?: boolean; port?: number; topAuth?: string; dbotsAuth?: string }) {
		this.port = port;
		this.client = client;
		this.online = online;
		this.topAuth = topAuth;
		this.dbotsAuth = dbotsAuth;
		this.time = 0;
		this.totalGuilds = 50;
		this.totalMembers = 40000;
		this.totalChannels = 8000;
	}

	public async Start(): Promise<void> {
		if (this.online !== true) return;
		await fastify.register(import("fastify-rate-limit"), { global: true, max: 100, timeWindow: 100000 });
		await fastify.register(import("fastify-static"), { root: join(__dirname, "..", "..", "public") });
		await fastify.register(import("fastify-helmet"), { contentSecurityPolicy: false });
		await fastify.get("/api/stats", async () => await this.stats());
		await fastify.post("/api/votes", async (req) => await this.votes(req));
		await fastify.register(this.Routes, { logLevel: "warn" });
		await fastify.register(this.Api, { logLevel: "warn" });
		await fastify.listen(this.port, "0.0.0.0");

		return await sleep("2000").then(() => this.client.logger.info(sec(`Server running at http://localhost:${this.port}`)));
	}
	public async Close(): Promise<void> {
		this.client.logger.warn("[ CLOSING SERVER ]", 5);
		return await fastify.close();
	}
	public Routes(fastify: FastifyInstance, opts, done): void {
		fastify.get("/", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "home.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/privacy", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "privacy.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/commands", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "commands.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/commands/list", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "list.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/tos", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "tos.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/credits", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "credit.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/patchnotes", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "patchnotes.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/info", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "info.html"));
			res.type("text/html").send(bufferIndexHtml);
		});

		/** redirects */
		fastify.get("/patch", (req, res) => {
			res.redirect("/patchnotes");
		});
		fastify.get("/cmds", (req, res) => {
			res.redirect("/commands");
		});
		fastify.get("/cmd", (req, res) => {
			res.redirect("/commands");
		});
		fastify.get("/termsofservice", (req, res) => {
			res.redirect("/tos");
		});
		fastify.get("/home", (req, res) => {
			res.redirect("/");
		});
		fastify.get("/support", (req, res) => {
			res.redirect("https://discord.gg/KkMKCchJb8");
		});
		fastify.get("/invite", (req, res) => {
			res.redirect("https://discord.com/oauth2/authorize?client_id=749020331187896410&scope=bot&permissions=117824");
		});
		fastify.get("/admin/", async () => {});

		done();
	}

	public Api(fastify, opts, done): void {
		fastify.get("/api/*", () => {
			return { success: false, message: "End point was not found." };
		});
		fastify.post("/api/*", () => {
			return { success: false, message: "End point was not found." };
		});
		done();
	}
	public async votes(req): Promise<{ success: boolean; status: number; message?: string }> {
		if (req?.headers?.authorization == this.topAuth || req?.headers?.authorization == this.dbotsAuth) {
			let member: User;
			if (req?.headers.authorization == this.topAuth) {
				member = await this.client.users.fetch(req.body.user);
			} else if (req?.headers.authorization == this.dbotsAuth) {
				member = await this.client.users.fetch(req.body.id);
			}
			const iq = Math.floor(Math.random() * 150) + 1;
			this.client.UserData.ensure(member.id, { iq: iq });
			if (!member) return;
			this.client.logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));
			const cur = Number(this.client.UserData.get(member.id as string, "iq"));
			if (!cur) return;
			const amount = req.body.isWeekend ? 2 : 1;
			this.client.UserData.set(member.id, cur + amount, "iq");

			const channel = (this.client.channels.cache.get("823935750168117312") || (await this.client.channels.fetch("823935750168117312"))) as TextChannel;
			channel.send(
				new MessageEmbed()
					.setAuthor(`vote from ${member.tag}`, member.avatarURL())
					.setDescription(`**${member} had ${cur || "Nothing"} iq now has ${cur + amount || "Nothing"} iq**`)
					.setTimestamp()
					.setColor("#f000ff")
			);
			return { success: true, status: 200 };
		} else return { success: false, status: 203, message: "Authorization is required to access this endpoint." };
	}
	public async stats(): Promise<{ guilds: number; users: number; channels: number }> {
		if (this.time == 0 || Date.now() - this.time > 1800000) {
			this.time = Date.now();
			this.totalGuilds = await this.client.shard.fetchClientValues("guilds.cache.size").then((serv) => serv.reduce((acc, guildCount) => acc + guildCount, 0));
			// prettier-ignore
			this.totalMembers = await this.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then(member => member.reduce((acc, memberCount) => acc + memberCount, 0))
			// prettier-ignore
			this.totalChannels = await this.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)').then(channel => channel.reduce((acc, channelCount) => acc + channelCount, 0))
		}
		return { guilds: this.totalGuilds, users: this.totalMembers, channels: this.totalChannels };
	}
}
