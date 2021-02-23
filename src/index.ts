import { token } from './config'
import { ShardingManager } from 'discord.js';
export const manager = new ShardingManager('./dist/bot.js', { token: token });
import { logger } from './lib/Utils'
manager.on('shardCreate', shard => logger.info(`[ SHARD STARTED ] ${shard.id}`));
manager.spawn();