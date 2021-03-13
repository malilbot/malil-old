import { exec } from "child_process"
if (process.platform == "linux") {
    exec("cat resources/enmap.txt > ./node_modules/enmap/src/index.js")
}
import { ShardingManager } from "discord.js"
import { credentials } from "./settings"
const { token } = credentials
import { logger, third, sec, main } from "./lib/Utils"
const manager = new ShardingManager("./dist/lib/bot.js", {
    token: token,
    totalShards: "auto",
})

manager.on("shardCreate", (shard) => {
    if (shard.id == 0) return logger.info(sec("[ PREPARING TO START]") + main(" [ SHARD 1 ]"))
    logger.info(`[ SHARD ] ` + third(shard.id + 1))
})

manager.spawn()
