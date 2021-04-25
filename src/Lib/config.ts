import Enmap from "enmap";
import { join } from "path";
import { credentials, Settings } from "../settings";
const generalpurpose = new Enmap({
	name: "gp",
	dataDir: join(__dirname, "..", "..", "data/gp"),
	polling: Settings.polling,
});
let login = credentials.token;
if (Settings.dev == true) login = credentials.devtoken;

export const token: string = login;
export const owners: string[] = Settings.owners;
export const superUsers: string[] = [].concat(Settings.owners, generalpurpose.ensure("superUsers", []));
generalpurpose.close();
