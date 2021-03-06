// eslint-disable-next-line @typescript-eslint/no-var-requires

import Enmap from 'enmap';
import { join } from 'path';
import { credentials, setting } from '../settings';
const settings = setting;
const generalpurpose = new Enmap({
	name: 'gp',
	dataDir: join(__dirname, '..', '..', 'data/gp'),
	polling: true,
});
if (!generalpurpose.get('superUsers')) generalpurpose.ensure('superUsers', []);
let login = credentials.token;
if (settings.dev == true) login = credentials.devtoken;

export const token: string = login;
export const owners: string[] = settings.owners;
export const superUsers: string[] = [].concat(
	settings.owners,
	generalpurpose.get('superUsers')
);
