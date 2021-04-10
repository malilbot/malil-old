import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import marked from "marked";
import { exec } from "child_process";
const showdown = require("showdown"),
	converter = new showdown.Converter();
converter.setFlavor("github");
for (const file of readdirSync(join(__dirname, "..", "..", "public", "md")).filter((file) => file.endsWith(".md"))) {
	writeFileSync(
		join(__dirname, "..", "..", "public", "html", file.replace(".md", ".html")),
		readFileSync(join(__dirname, "..", "..", "public", "md", file.replace(".md", ".html")), "utf-8").replace(
			"{{input}}",
			converter.makeHtml(readFileSync(join(__dirname, "..", "..", "public", "md", file), "utf-8"))
		)
	);
	console.log(file);
}
exec("npx prettier-eslint --write ./public/**/**");
