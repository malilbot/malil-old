import { token } from './config'
import { ShardingManager } from 'discord.js';
export const manager = new ShardingManager('./finish/bot.js', { token: token });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();