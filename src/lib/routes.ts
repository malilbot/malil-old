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
	fastify.get("/cmds", (req, res) => {
		res.redirect("/commands");
	});
	fastify.get("/cmd", (req, res) => {
		res.redirect("/commands");
	});
	fastify.get("/api/*", (req, res) => {
		return { success: false, message: "End point was not found." };
	});
	fastify.get("*", (req, res) => {
		const bufferIndexHtml = readFileSync(join(__dirname, "..", "..", "..", "public", "html", "404.html"));
		res.type("text/html").send(bufferIndexHtml);
	});
	done();
};
