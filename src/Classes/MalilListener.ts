import { Listener } from "discord-akairo";
import Client from "./Client";

export class MalilListener extends Listener {
	public client = super.client as Client;
}
