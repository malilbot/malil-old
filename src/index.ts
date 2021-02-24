import { token } from './config'
import { ShardingManager } from 'discord.js';
export const manager = new ShardingManager('./dist/bot.js', { token: token, totalShards: "auto" });
import { logger } from './lib/Utils'
manager.on('shardCreate', shard => {
    logger.info(`[ SHARD ] ${shard.id}`)

});
manager.spawn();