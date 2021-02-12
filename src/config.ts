// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import settings from '../settings.js'

export const token: string = settings.token
export const owners: string[] = settings.owners;

