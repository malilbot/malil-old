import { red, blue, gray, yellow, green, magenta, cyan, hex } from "chalk";


import { dev } from '../../../settings.js'
const num = Math.floor((Math.random() * 2) + 1);
let
    main,
    sec,
    third,
    fourth,
    a1,
    split
if (dev == true) {
    if (num == 1) {
        a1 = gray
        main = red
        sec = yellow
        third = cyan
        fourth = green
        split = gray(" - ")
    } else {
        a1 = red
        main = hex("#2a1ac9")
        sec = magenta
        third = blue
        fourth = gray
        split = green(" - ")
    }

} else {
    if (num == 1) {
        a1 = yellow
        main = blue
        sec = green
        third = magenta
        fourth = cyan
        split = yellow(" - ")
    } else {
        a1 = green
        main = cyan
        sec = magenta
        third = red
        fourth = gray
        split = blue(" - ")
    }

}
export {
    main,
    sec,
    third,
    fourth,
    a1,
    split
}