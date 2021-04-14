import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import Showdown from "showdown";
const showdown = new Showdown.Converter();
showdown.setFlavor("github");
const topnav = readFileSync(join(__dirname, "..", "..", "public", "src", "global", "topnav.as"), "utf-8");
const head = readFileSync(join(__dirname, "..", "..", "public", "src", "global", "head.as"), "utf-8");
const breef = readFileSync(join(__dirname, "..", "..", "wiki", "Breef.md"), "utf-8");
for (const file of readdirSync(join(__dirname, "..", "..", "public", "src", "md")).filter((file) => file.endsWith(".md"))) {
	const converted = showdown.makeHtml(readFileSync(join(__dirname, "..", "..", "public", "src", "md", file), "utf-8").replace("{{breef}}", breef));

	const dir = join(__dirname, "..", "..", "public", "html", file.replace(".md", ".html"));

	const out = readFileSync(join(__dirname, "..", "..", "public", "src", "html", file.replace(".md", ".html")), "utf-8")
		.replace("{{input}}", converted)
		.replace("{{topnav}}", topnav)
		.replace("{{head}}", head)
		.replace("{{title}}", file.replace(".md", ""));

	writeFileSync(dir, out);
	console.log(file);
}
exec("npx prettier-eslint --write ./public/**/**");
