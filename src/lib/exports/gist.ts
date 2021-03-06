/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-const */
import centra from 'centra';

export const CreateGist = async function (name: any, content: any, client) {
	let files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || 'oops something went wrong :(',
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	let gist = await (
		await centra('https://api.github.com/gists', 'POST')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.body(body, 'json')
			.send()
	).json();
	const out = `${gist.id}`;
	return out;
};
export const EditGist = async function (
	name: any,
	content: any,
	GistId: any,
	client
) {
	let files: { [key: string]: { content: string } } = {};
	files[name] = {
		content: content || 'oops something went wrong :(',
	};
	const body = {
		description: `Malil`,
		public: false,
		files,
	};
	let gist = await (
		await centra('https://api.github.com/gists/' + GistId, 'POST')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.body(body, 'json')
			.send()
	).json();
	return gist;
};
export const GetGist = async function (GistId: any, client) {
	let gist = await (
		await centra('https://api.github.com/gists/' + GistId, 'GET')
			.header('User-Agent', 'Malil')
			.header('Authorization', `token ${client.credentials.gist}`)
			.send()
	).json();
	return gist;
};
