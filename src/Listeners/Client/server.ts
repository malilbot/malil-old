import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { Settings } from "../../settings";
import { User, MessageEmbed, TextChannel } from "discord.js";
import { join } from "path";
import { sec, fourth } from "../../lib/Utils";
import { readFileSync } from "fs";
const fastify = require("fastify")({
	logger: false,
	root: join(__dirname, "..", "..", "..", "public", "html"),
});

export default class server extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("server", {
			emitter: "client",
			event: "startServer",
			category: "client",
		});
		this.client = client;
	}
	public async exec(guilds: number, users: number): Promise<void> {
		const { site, server, auth } = Settings;
		if (site !== true) return;
		const { port } = server;
		const { topAuth, dbotsAuth } = auth;
		const client = this.client;

		fastify.register(require("fastify-static"), {
			root: join(__dirname, "..", "..", "..", "public"),
			//prefix: "/public/", // optional: default '/'
		});

		fastify.get("/", (req, res) => {
			console.log(req.ip);
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "..", "public", "html", "home.html"));
			res.type("text/html").send(bufferIndexHtml);
		});

		fastify.get("/privacy", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "..", "public", "html", "privacy.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/commands", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "..", "public", "html", "commands.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.get("/cmds", (req, res) => {
			res.redirect("/commands");
		});
		fastify.get("/cmd", (req, res) => {
			res.redirect("/commands");
		});
		fastify.post("/api/votes", async (req: any, res) => {
			const headers = req.headers;
			if (headers?.authorization) {
				let member: User;
				if (headers.authorization == topAuth || headers.authorization == dbotsAuth) {
					if (headers.authorization == topAuth) {
						member = await client.users.fetch(req.body.user);
					} else if (headers.authorization == dbotsAuth) {
						member = await client.users.fetch(req.body.id);
					}

					client.gp.math("commands", "+", 1);
					const iq = Math.floor(Math.random() * 150) + 1;
					client.UserData.ensure(member.id, { iq: iq });
					if (!member) return client.logger.info("WHATTT?");
					client.logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));
					const wknd = req.body.isWeekend;
					const cur = Number(client.UserData.get(member.id as string, "iq"));
					if (!cur) return;
					const amount = wknd ? 2 : 1;
					client.UserData.set(member.id, cur + amount, "iq");

					const channel = (this.client.channels.cache.get("823935750168117312") || (await this.client.channels.fetch("823935750168117312"))) as TextChannel;
					channel.send(
						new MessageEmbed()
							.setAuthor(`vote from ${member.tag}`, member.avatarURL())
							.setDescription(`**${member} had ${cur || "Nothing"} iq now has ${cur + amount || "Nothing"} iq**`)
							.setTimestamp()
							.setColor(this.client.colors.blue)
					);
					return { success: true, status: 200 };
				} else {
					return { success: false, status: 203, message: "Authorization is required to access this endpoint." };
				}
			} else {
				return { success: false, status: 203, message: "Authorization is required to access this endpoint." };
			}
		});
		fastify.get("/api/*", (req, res) => {
			return { success: false, message: "End point was not found." };
		});
		fastify.get("*", (req, res) => {
			const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "..", "public", "html", "404.html"));
			res.type("text/html").send(bufferIndexHtml);
		});
		fastify.listen(port, "0.0.0.0", () => this.client.logger.info(sec(`Server running at http://localhost:${port}`)));
	}
}
/*
			console.log("Server is running...");
			const res = await (
				await centra(`http://127.0.0.1:${port}/api/votes`, "post")
					.body({ bot: "749020331187896410", user: "336465356304678913", type: "upvote", query: "?reminderClicked", isWeekend: true })
					.header("Authorization", auth)
					.send()
			).json();
			console.log(await res);
			*/
/*
app.set("view engine", "html");
		const file = (await readFileSync(join(__dirname, "..", "..", "..", "public", "html", "home.html")))
			.toString()
			.replace(`{{ GUILDS }}`, guilds.toString())
			.replace("{{ MEMBERS }}", users.toString());
		console.log(file);
		app.set("view engine", "html");

		app.get("/", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/view.html"));
		});

		app.get("/admin", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/dashboard.html"));
		});
		app.get("/admin1", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/login.html"));
		});
		app.get("/admin2", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/login.html"));
		});
		*/
/*
		app.get("/logout", function (req, res) {
			req.logout();
			res.redirect("/");
		});
		*/
// Simple route middleware to ensure user is authenticated.
//  Use this route middleware on any resource that needs to be protected.  If
//  the request is authenticated (typically via a persistent login session),
//  the request will proceed.  Otherwise, the user will be redirected to the login page.
/*
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
}
/*
		app.get("/protected", ensureAuthenticated, function (req, res) {
			res.send("acess granted");
		});
		*/
/***************************************************************
 *********** Github Configuration setup...
 ***************************************************************/
/*
		passport.use(
			new Strategy(
				{
					clientID,
					clientSecret,
					callbackURL: `http://localhost:${port}/admin/auth/github/callback`,
				},
				function (accessToken, refreshToken, profile, done) {
					// we will just use the profile object returned by GitHub
					return done(null, profile);
				}
			)
		);
				
		// Express and Passport Session
		app.use(session({ secret: password }));
		app.use(passport.initialize());
		app.use(passport.session());

		passport.serializeUser(function (user, done) {
			// placeholder for custom user serialization
			done(null, user);
		});

		passport.deserializeUser(function (user, done) {
			// placeholder for custom user deserialization.
			// maybe you are getoing to get the user from mongo by id?

			done(null, user); // null is for errors
		});
		app.use(express.static(join(__dirname, "..", "..", "..", "resources", "/style.css")));

		app.get("/admin/auth/github", passport.authenticate("github"));
		app.get("/admin/login", function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/login.html"));
		});

		app.get("/admin/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), function (req, res) {
			res.redirect("/dashboard");
		});

		app.get("/admin/dashboard", function (req, res) {
			if (req.isAuthenticated()) {
				if (req.user.id == ownerid) {
					res.sendFile(join(__dirname, "..", "..", "..", "resources", "/dashboard.html"));
				} else {
					res.sendFile(join(__dirname, "..", "..", "..", "resources", "/noacess.html"));
				}
			} else {
				res.redirect("/admin/login");
			}
		});
		*/
