import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { Settings } from "../../settings";
import express from "express";
const app = express();
import { join } from "path";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-github";
import { main, sec, third, fourth, split } from "../../lib/Utils";
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
		const { password, auth, clientID, port, site, clientSecret } = Settings;
		if (site !== true) return;

		const client = this.client;

		/***************************************************************
		 *********** Github Configuration setup...
		 ***************************************************************/

		passport.use(
			new Strategy(
				{
					clientID,
					clientSecret,
					callbackURL: `http://localhost:${port}/auth/github/callback`,
				},
				function (accessToken, refreshToken, profile, done) {
					// we will just use the profile object returned by GitHub
					return done(null, profile);
				}
			)
		);

		// Express and Passport Session
		app.use(session({ secret: "jsonworldbestplaformforjsframeworks" }));
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

		// we will call this to start the GitHub Login process
		app.get("/auth/github", passport.authenticate("github"));
		app.get("/login", passport.authenticate("github"));
		// GitHub will call this URL
		app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), function (req, res) {
			res.redirect("/");
		});

		app.get("/dashboard", function (req, res) {
			if (req.isAuthenticated()) {
				if (req.user.id == "72335827") {
					res.sendFile(join(__dirname, "..", "..", "..", "resources", "/view.html"));
				}
				res.sendFile(join(__dirname, "..", "..", "..", "resources", "/login.html"));
			}
			res.sendFile(join(__dirname, "..", "..", "..", "resources", "/dashboard.html"));
		});

		app.get("/logout", function (req, res) {
			req.logout();
			res.redirect("/");
		});

		// Simple route middleware to ensure user is authenticated.
		//  Use this route middleware on any resource that needs to be protected.  If
		//  the request is authenticated (typically via a persistent login session),
		//  the request will proceed.  Otherwise, the user will be redirected to the login page.

		function ensureAuthenticated(req, res, next) {
			if (req.isAuthenticated()) {
				return next();
			}
			res.redirect("/");
		}

		app.get("/protected", ensureAuthenticated, function (req, res) {
			res.send("acess granted");
		});

		app.post("/api/votes", async function (req, res) {
			const headers = req.headers;
			if (headers?.authorization) {
				if (headers.authorization == auth) {
					client.gp.math("commands", "+", 1);
					const member = await client.users.fetch(req.body.user);
					const iq = Math.floor(Math.random() * 150) + 1;
					client.UserData.ensure(member.id, { iq: iq });
					if (!member) return client.logger.info("WHATTT?");
					client.logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));
					const wknd = req.body.isWeekend;
					const cur = Number(client.UserData.get(member.id, "iq"));
					if (!cur) return;
					const amount = wknd ? 2 : 1;
					client.UserData.set(member.id, cur + amount, "iq");
					return res.send({ success: true, status: 200 });
				} else {
					return res.send({
						success: false,
						status: 203,
						message: "Authorization is required to access this endpoint.",
					});
				}
			} else {
				return res.send({
					success: false,
					status: 203,
					message: "Authorization is required to access this endpoint.",
				});
			}
		});
		app.listen(port, async () => {
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
		});
	}
}
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