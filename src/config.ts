require('dotenv').config();
const config = require("../config.json")


export const token: string = process.env.token;
export const prefix: string = process.env.PREFIX;
export const owners: string[] = config.owners;
export const blacklist: string[] = config.blacklist;

