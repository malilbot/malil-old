import Client from './client/Client';
import { owners, token } from './config';

const client = new Client({ owners: owners, token: token });

client.goo();