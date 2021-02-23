import { token } from './config'
import { ShardingManager } from 'discord.js';
export const manager = new ShardingManager('./dist/bot.js', { token: token, totalShards: 6, });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();