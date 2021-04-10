import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import marked from "marked";
for (const file of readdirSync(join(__dirname, "..", "..", "public", "md")).filter((file) => file.endsWith(".md"))) {
	writeFileSync(
		join(__dirname, "..", "..", "public", "html", file.replace(".md", ".html")),
		readFileSync(join(__dirname, "..", "..", "public", "md", file.replace(".md", ".xml")), "utf-8").replace(
			"{{input}}",
			marked(readFileSync(join(__dirname, "..", "..", "public", "md", file), "utf-8"))
		)
	);
	console.log(file);
}
