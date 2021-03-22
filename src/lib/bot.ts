import Client from "./Client";
import { owners, token, superUsers } from "./config";
//import { credentials } from "../settings";
//for (const token of credentials.tokens) {
const client = new Client({ owners: owners, token: token, superUsers: superUsers });

client.goo();
//}
