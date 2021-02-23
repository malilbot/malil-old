import Client from './client/Client';
import { owners, token, superUsers } from './config';
const client = new Client({ owners: owners, token: token, superUsers: superUsers, ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } });

client.goo();