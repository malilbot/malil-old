import Client from './client/Client';
import { owners, blacklist, prefix } from './config';

const client = new Client({ owners: owners, token: process.env.token, blacklist: blacklist, prefix: prefix});

client
    .on('error', err => console.log(`[ CLIENT ERROR ] ${err.message}`, err.stack))
    .on('warn', warn => console.log(`[ CLIENT WARN ] ${warn}`));
client.goo();