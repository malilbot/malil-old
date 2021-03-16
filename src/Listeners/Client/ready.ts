import { Listener } from "discord-akairo";
import Client from "../../lib/Client";
import { fixspace } from "../../lib/Utils";
import { log } from "console";
import { TextChannel } from "discord.js";
import { exec } from "child_process";
import { main, sec, third, fourth, split } from "../../lib/Utils";
const { floor, random } = Math;
export default class Ready extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
		this.client = client;
	}
	public async exec() {
		if (this.client?.shard?.ids[0] == this.client.options.shardCount - 1 && this.client.shard.ids[0] !== 0)
			return this.client.logger.info("[ MAXSHARDS ]");
		if (this.client?.shard?.ids[0] !== 0) return;
		const num = floor(random() * 2 + 1);

		const mm1 = String.raw`          /           `,
			mm2 = String.raw`       ${sec("/╬")}▓           `,
			mm3 = String.raw`     ${sec("/▓▓")}╢            `,
			mm4 = String.raw`   [${sec("▓▓")}▓╣/            `,
			mm5 = String.raw`   [╢╢╣▓             `,
			mm6 = String.raw`    %,╚╣╣@\          `,
			mm7 = String.raw`      #,╙▓▓▓\╙N      `,
			mm8 = String.raw`       '╙ \▓▓▓╖╙╦    `,
			mm9 = String.raw`            \@╣▓╗╢%  `,
			m10 = String.raw`               ▓╣╢╢] `,
			m11 = String.raw`              /╣▓${sec("▓▓")}] `,
			m12 = String.raw`              ╢${sec("▓▓/")}   `,
			m13 = String.raw`             ▓${sec("╬/")}     `,
			m14 = String.raw`            /        `;

		const ll1 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ ",
			ll2 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll3 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll4 = "⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			ll5 = "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			ll6 = "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			ll7 = "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			ll8 = "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			ll9 = "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			l10 = "⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍",
			l11 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l12 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l13 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍" + fourth("᳃᳃") + "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍",
			l14 = "⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍";
		const q1 = `1.0.0 [ ${this.client.user.username} ]`,
			q2 = 5,
			a1 = await fixspace(this.client.commandHandler.modules.size, q2),
			a2 = await fixspace(this.client.listenerHandler.modules.size, q2),
			a3 = await fixspace(this.client.inhibitorHandler.modules.size, q2),
			a4 = await fixspace(this.client.guilds.cache.size, q2),
			a5 = await fixspace(
				this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0),
				q2
			),
			a6 = await fixspace(
				this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
				q2
			),
			a7 = await fixspace(this.client.options.shardCount, q2);
		const b1 = " ███╗   ███╗ █████╗ ██╗     ██╗██╗",
			b2 = " ████╗ ████║██╔══██╗██║     ██║██║",
			b3 = " ██╔████╔██║███████║██║     ██║██║",
			b4 = " ██║╚██╔╝██║██╔══██║██║     ██║██║",
			b5 = " ██║ ╚═╝ ██║██║  ██║███████╗██║███████╗",
			b6 = " ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝";

		if (num == 2) {
			log(main(ll1) + fourth(q1));
			log(main(ll2) + sec(b1));
			log(main(ll3) + sec(b2));
			log(main(ll4) + sec(b3));
			log(main(ll5) + sec(b4));
			log(main(ll6) + sec(b5));
			log(main(ll7) + sec(b6));
			log(main(ll8), split, third(a1), split, third("Commands"));
			log(main(ll9), split, third(a2), split, third("Listeners"));
			log(main(l10), split, third(a3), split, third("Inhibitors"));
			log(main(l11), split, third(a4), split, third("Guilds"));
			log(main(l12), split, third(a5), split, third("Channels"));
			log(main(l13), split, third(a6), split, third("Users"));
			log(main(l14), split, third(a7), split, third("Shards"));
		} else {
			log(main(mm1) + fourth(q1));
			log(main(mm2) + sec(b1));
			log(main(mm3) + sec(b2));
			log(main(mm4) + sec(b3));
			log(main(mm5) + sec(b4));
			log(main(mm6) + sec(b5));
			log(main(mm7) + sec(b6));
			log(main(mm8), split, third(a1), split, third("Commands"));
			log(main(mm9), split, third(a2), split, third("Listeners"));
			log(main(m10), split, third(a3), split, third("Inhibitors"));
			log(main(m11), split, third(a4), split, third("Guilds"));
			log(main(m12), split, third(a5), split, third("Channels"));
			log(main(m13), split, third(a6), split, third("Users"));
			log(main(m14), split, third(a7), split, third("Shards"));
		}
	}
}
