import centra from "centra";

export const gist = async function(name: any, content: any, client) {
	let files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || "oops something went wrong :("
	};
	const body = {
		description: `Malil`,
		public: false,
		files
	};
	let gist = await (await centra("https://api.github.com/gists", "POST")
		.header("User-Agent", "Malil")
		.header("Authorization", `token ${client.setting.gist}`)
		.body(body, "json")
		.send()).json();
	const out = `${gist.id}`;
	return out;
};
