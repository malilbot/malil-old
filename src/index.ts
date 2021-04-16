import { exec } from "child_process";

if (process.platform == "linux") {
	exec("cat resources/enmap.txt > ./node_modules/enmap/src/index.js");
}
import { ShardingManager } from "discord.js";
import { credentials } from "./settings";

/**SOME COLORING AND DIR FUNCTION */
import { logger, third, sec, main } from "./Lib/Utils";
/** TOKEN */
const { token } = credentials;
/** SHARDING MANAGER */
const manager = new ShardingManager("./dist/Lib/bot.js", {
	token: token,
	totalShards: "auto",
});

/**Created some directories */
/**Nice lookn console */
manager.on("shardCreate", (shard) => {
	if (shard.id == 0) return logger.info(sec("[ PREPARING TO START]") + main(" [ SHARD 1 ]"));
	logger.info(`[ SHARD ] ` + third(shard.id + 1));
});

manager.spawn();
