require('dotenv').config();
import * as config from '../config.js'

export const token: string = process.env.token;
export const prefix: string = process.env.PREFIX;
export const owners: string[] = config.owners;

