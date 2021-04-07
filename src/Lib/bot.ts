import Client from "../Classes/Client";
import { owners, token, superUsers } from "./config";
const client = new Client({ owners, token, superUsers });
client.goo();
