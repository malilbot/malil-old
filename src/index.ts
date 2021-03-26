import { exec } from "child_process";
import { mkdir, existsSync } from "fs";
if (process.platform == "linux") {
	exec("cat resources/enmap.txt > ./node_modules/enmap/src/index.js");
}
Dir();
import { ShardingManager } from "discord.js";
import { credentials } from "./settings";

/**SOME COLORING AND DIR FUNCTION */
import { logger, third, sec, main } from "./lib/Utils";
/** TOKEN */
const { token } = credentials;
/** SHARDING MANAGER */
const manager = new ShardingManager("./dist/lib/bot.js", {
	token: token,
	totalShards: "auto"
});

/**Created some directories */
/**Nice lookn console */
manager.on("shardCreate", (shard) => {
	if (shard.id == 0) return logger.info(sec("[ PREPARING TO START]") + main(" [ SHARD 1 ]"));
	logger.info(`[ SHARD ] ` + third(shard.id + 1));
});

manager.spawn();
/** */
/** Dont go down further */
//
//
/** I said dont */
//
//
//
//
/** You can stop now*/
//
//
//
//
//
/** Its not worth it */
//
//
//
//
/** Aight you asked for it */
//
//
//
//
/**Here it is happy now? */
function Dir(): void {
	if (existsSync("./data") && existsSync("./data/guilddata")) return;

	mkdir("./data", (e) => {
		console.log(e || "/data CREATED");
	});
	mkdir("./data/blacklist", (e) => {
		console.log(e || "/data/blacklist");
	});
	mkdir("./data/colornames", (e) => {
		console.log(e || "/data/colornames");
	});
	mkdir("./data/gp", (e) => {
		console.log(e || "/data/gp");
	});
	mkdir("./data/infractions", (e) => {
		console.log(e || "/data/infractions");
	});
	mkdir("./data/logchannel", (e) => {
		console.log(e || "/data/logchannel");
	});
	mkdir("./data/mutes", (e) => {
		console.log(e || "/data/mutes");
	});
	mkdir("./data/prefixes", (e) => {
		console.log(e || "/data/prefixes");
	});
	mkdir("./data/releases", (e) => {
		console.log(e || "/data/releases");
	});
	mkdir("./data/guilddata", (e) => {
		console.log(e || "/data/guilddata");
	});
	mkdir("./data/tags", (e) => {
		console.log(e || "/data/tags");
	});
	mkdir("./data/userData", (e) => {
		console.log(e || "/data/userData");
	});
}
