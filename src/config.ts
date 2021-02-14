// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import settings from '../settings.js'

let login = settings.token
if (settings.dev == true) login = settings.devtoken

export const token: string = login
export const owners: string[] = settings.owners;

