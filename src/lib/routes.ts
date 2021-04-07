import { readFileSync } from "fs";
import { join } from "path";
module.exports = function (fastify, opts, done) {
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
	fastify.get("/tos", (req, res) => {
		const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "tos.html"));
		res.type("text/html").send(bufferIndexHtml);
	});
	fastify.get("/credits", (req, res) => {
		const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "public", "html", "credits.html"));
		res.type("text/html").send(bufferIndexHtml);
	});
	/** redirects */
	fastify.get("/cmds", (req, res) => {
		res.redirect("/commands");
	});
	fastify.get("/cmd", (req, res) => {
		res.redirect("/commands");
	});
	fastify.get("/termsofservice", (req, res) => {
		res.redirect("/");
	});
	fastify.get("/home", (req, res) => {
		res.redirect("/");
	});
	fastify.get("/api/*", () => {
		return { success: false, message: "End point was not found." };
	});
	done();
};
