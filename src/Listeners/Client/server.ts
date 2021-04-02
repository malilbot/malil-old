import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { Settings } from "../../settings";
import express from "express";
import { User, MessageEmbed } from "discord.js";
const app = express();
import { join } from "path";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-github";
import { sec, fourth } from "../../lib/Utils";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default class server extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("server", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}
	public async exec(): Promise<void> {
		const { site, server, auth } = Settings;
		if (site !== true) return;
		const { password, clientID, port, clientSecret, ownerid } = server;
		const { topAuth, dbotsAuth } = auth;
		const client = this.client;
		app.use(express.static(join(__dirname, "..", "..", "..", "public")));
		app.get("/", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "public", "html", "home.html"));
		});
		app.get("/privacy", async function (req, res) {
			res.sendFile(join(__dirname, "..", "..", "..", "public", "html", "privacy.html"));
		});
		app.post("/api/votes", async function (req, res) {
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

					const channel = this.client.channels.cache.get("823935750168117312") || (await this.client.channels.fetch("823935750168117312"));
					channel.send(
						new MessageEmbed()
							.setAuthor(`vote from ${member.tag}`, member.avatarURL())
							.setDescription(`**${member} had ${cur || "Nothing"} iq now has ${cur + amount || "Nothing"} iq**`)
							.setTimestamp()
							.setColor(this.client.colors.blue)
					);
					return res.send({ success: true, status: 200 });
				} else {
					return res.send({ success: false, status: 203, message: "Authorization is required to access this endpoint." });
				}
			} else {
				return res.send({ success: false, status: 203, message: "Authorization is required to access this endpoint." });
			}
		});
		app.get("*", (req, res) => {
			res.sendFile(join(__dirname, "..", "..", "..", "public", "html", "404.html"));
		});
		app.listen(port, async () => await this.client.logger.info(sec(`Server running at http://localhost:${port}`)));
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
