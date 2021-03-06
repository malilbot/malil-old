// eslint-disable-next-line @typescript-eslint/no-var-requires

import Enmap from 'enmap';
import { join } from 'path';
import { settings } from '../settings';

const generalpurpose = new Enmap({
	name: 'gp',
	dataDir: join(__dirname, '..', '..', 'data/gp'),
	polling: true,
});
if (!generalpurpose.get('superUsers')) generalpurpose.ensure('superUsers', []);
let login = settings.token;
if (settings.dev == true) login = settings.devtoken;

export const token: string = login;
export const owners: string[] = settings.owners;
export const superUsers: string[] = [].concat(
	settings.owners,
	generalpurpose.get('superUsers')
);
