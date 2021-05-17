import Fastify from "fastify";
import { readFileSync } from "fs";
import { join } from "path";
export = (): void => {
	const fastify = Fastify({ logger: false });

	const start = async () => {
		fastify.get("/", async () => {
			const json = JSON.parse(readFileSync(join(__dirname, "..", "..", "data", "stats.json"), "utf8"));
			return json;
		});
		try {
			await fastify.listen(6969, "0.0.0.0");
		} catch (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	};
	start();
};
