import Client from "./Client";
import { owners, token, superUsers } from "./config";

export const client = new Client({ owners: owners, token: token, superUsers: superUsers });

client.goo();
