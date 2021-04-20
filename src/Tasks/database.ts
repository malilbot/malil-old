const { exec } = require("child_process");
module.exports = {
	name: "database",
	delay: "12h",
	runOnStart: false,
	awaitReady: false,
	async execute(client) {
		const date = new Date();
		const fileName = `${`${date.getMonth()}-${date.getDate()}-${date.getMinutes()}:${date.getSeconds()}`}.tar.gz`;
		exec(`tar -czvf backups/${fileName} data/`, async (err, stdout, stderr) => {
			const channel = await client.channels.fetch("834002037787197480");
			channel.send({ content: `Heres the ${fileName} backup`, files: [`backups/${fileName}`] });
		});
	},
};
