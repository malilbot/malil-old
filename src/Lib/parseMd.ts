import { readFileSync, writeFileSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";
import marked from "marked";
const folder = readdirSync(join(__dirname, "..", "..", "public", "md")).filter((file) => file.endsWith(".md"));
for (const file of folder) {
	var md = readFileSync(join(__dirname, "..", "..", "public", "md", file), "utf-8");
	var html = readFileSync(join(__dirname, "..", "..", "public", "md", file.replace(".md", ".htm")), "utf-8");
	var Marked = marked(md);
	const out = html.replace("{{input}}", Marked);
	writeFileSync(join(__dirname, "..", "..", "public", "html", file.replace(".md", ".html")), out);
}
