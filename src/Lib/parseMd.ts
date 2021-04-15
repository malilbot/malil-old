import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { green, blue, cyan } from "chalk";
import Showdown from "showdown";
const showdown = new Showdown.Converter();
showdown.setFlavor("github");
const topnav = readFileSync(join(__dirname, "..", "..", "public", "src", "global", "topnav.as"), "utf-8");
const head = readFileSync(join(__dirname, "..", "..", "public", "src", "global", "head.as"), "utf-8");
const breef = readFileSync(join(__dirname, "..", "..", "wiki", "Breef.md"), "utf-8");
for (const file of readdirSync(join(__dirname, "..", "..", "public", "src", "scss")).filter((file) => file.endsWith(".scss"))) {
	console.time(cyan(file));
	const scss = join(__dirname, "..", "..", "public", "src", "scss", file);
	const css = join(__dirname, "..", "..", "public", "css", file.replace(".scss", ".css"));
	exec(`yarn sass ${scss} ${css}`);
	console.timeEnd(cyan(file));
}

for (const file of readdirSync(join(__dirname, "..", "..", "public", "src", "md")).filter((file) => file.endsWith(".tf"))) {
	console.time(blue(file));
	const html = readFileSync(join(__dirname, "..", "..", "public", "src", "md", file), "utf-8").replace("{{breef}}", breef).split("{!")[0];
	const md = readFileSync(join(__dirname, "..", "..", "public", "src", "md", file), "utf-8").replace("{{breef}}", breef).split("{!")[1];
	const converted = showdown.makeHtml(md);
	//todo time
	const dir = join(__dirname, "..", "..", "public", "html", file.replace(".tf", ".html"));

	const out = html
		.replace("{{input}}", converted)

		.replace("{{topnav}}", topnav)

		.replace("{{head}}", head)

		.replace("{{breef}}", breef)

		.replace("{{title}}", file.replace(".tf", ""));

	writeFileSync(dir, out);
	console.timeEnd(blue(file));
}
console.time(green("Formatted"));
//exec("npx prettier-eslint --write ./public/**/**", () => console.timeEnd(green("Formatted")));
