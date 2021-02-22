// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import settings from '../settings.js'
import Enmap from "enmap"

const generalpurpose = new Enmap({ name: "gp" })
if (!generalpurpose.get("superUsers")) generalpurpose.ensure("superUsers", [])
let login = settings.token
if (settings.dev == true) login = settings.devtoken

export const token: string = login
export const owners: string[] = settings.owners;
export const superUsers: string[] = [].concat(settings.owners, generalpurpose.get("superUsers"))
