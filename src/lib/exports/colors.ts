import { red, blue, gray, yellow, green, magenta, whiteBright, bgWhite, bgBlack, greenBright, cyanBright, white, cyan, bold, black, hex, reset } from "chalk";


import { dev } from '../../../settings.js'
let
    main,
    sec,
    third,
    fourth,
    a1,
    split
if (dev == true) {
    a1 = gray
    main = red
    sec = yellow
    third = cyan
    fourth = bgWhite.black
    split = greenBright(" - ")
} else {
    a1 = yellow
    main = blue
    sec = green
    third = magenta
    fourth = bgBlack.white
    split = cyanBright(" - ")
}
export {
    main,
    sec,
    third,
    fourth,
    a1,
    split
}