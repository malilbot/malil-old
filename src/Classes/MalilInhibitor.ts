import { Inhibitor } from "discord-akairo";
import Client from "./Client";

export class MalilInhibitor extends Inhibitor {
	public client = super.client as Client;
}
