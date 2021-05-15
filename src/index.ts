import { ShardingManager } from "discord.js";
import { credentials } from "./settings";
const manager = new ShardingManager("./dist/Lib/bot.js", {
	token: credentials.token,
	totalShards: "auto",
});

manager.spawn();
