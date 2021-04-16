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

const compiler = new (class Compiler {
	scssdir: string;
	tfdir: string;
	cssdir: string;
	htmldir: string;
	constructor({ scss, tf, css, html }: { scss: string; tf: string; css: string; html: string }) {
		this.scssdir = scss;
		this.tfdir = tf;
		this.cssdir = css;
		this.htmldir = html;
	}
	async compileScss() {
		for (const file of readdirSync(this.scssdir).filter((file) => file.endsWith(".scss"))) {
			console.time(cyan(file));
			const scss = join(this.scssdir, file);
			const css = join(this.cssdir, file.replace(".scss", ".css"));
			exec(`yarn sass ${scss} ${css}`);
			console.timeEnd(cyan(file));
		}
	}
	async compileTf() {
		for (const file of readdirSync(join(this.tfdir)).filter((file) => file.endsWith(".tf"))) {
			console.time(blue(file));
			const html = readFileSync(join(this.tfdir, file), "utf-8").split("{!")[0];
			const md = readFileSync(join(this.tfdir, file), "utf-8").split("{!")[1];
			const converted = showdown.makeHtml(md);
			const dir = join(this.htmldir, file.replace(".tf", ".html"));

			const out = html
				.replace("{{input}}", converted)

				.replace("{{topnav}}", topnav)

				.replace("{{head}}", head)

				.replace("{{breef}}", breef)

				.replace("{{title}}", file.replace(".tf", ""));

			writeFileSync(dir, out);
			console.timeEnd(blue(file));
		}
	}
	async compile() {
		this.compileScss();
		this.compileTf();
		console.time(green("Formatted"));
		exec("npx prettier-eslint --write ./public/**/**", () => console.timeEnd(green("Formatted")));
	}
})({
	scss: join(__dirname, "..", "..", "public", "src", "scss"),
	tf: join(__dirname, "..", "..", "public", "src", "md"),
	css: join(__dirname, "..", "..", "public", "css"),
	html: join(__dirname, "..", "..", "public", "html"),
});
compiler.compile();
