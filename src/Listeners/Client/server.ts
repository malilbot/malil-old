import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { Settings } from "../../settings";
import { User, MessageEmbed, TextChannel } from "discord.js";
import { join } from "path";
import { sec, fourth, api } from "../../lib/Utils";
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
	public async exec(): Promise<void> {
		const { site, server, auth } = Settings;
		if (site !== true) return;
		const { port } = server;
		const { topAuth, dbotsAuth } = auth;
		const client = this.client;
		//prettier-ignore
		fastify.register(import("fastify-static"), { root: join(__dirname, "..", "..", "..", "public") });
		//prettier-ignore
		fastify.post("/api/votes", async (req) => { return await api(req, client, topAuth, dbotsAuth); });
		fastify.register(import("../../lib/routes"), { logLevel: "warn" });
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
