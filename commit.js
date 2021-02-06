var readline = require('readline');
const {green, red, blue, yellow} = require("chalk")
const {exec} = require("child_process");
const {exit} = require('process');
var rl = readline.createInterface({input: process.stdin, output: process.stdout});
let out = ''
let dist1 = ''
let dist2 = ''
let dist3 = ''
rl.question(green("What is the commit message?:  "), function (answer) {

    exec(`git add --all`, async (error, stdout, stderr) => {
        dist1 = error || stderr || stdout
    })
    exec(`git commit -m "${answer}"`, async (error, stdout, stderr) => {
        dist2 = error || stderr || stdout
    })
    rl.question(green(out + "\nDO you want to push?:  "), function (answer) {
        if (answer == 'yes' || answer == 'y') {
            exec(`git push`, async (error, stdout, stderr) => {
                dist3 = error || stderr || stdout
            })
            console.log(blue("Pushing the commit"))
            console.log(dist1)
            console.log(dist2)
            console.log(dist3)

        } else if (answer == 'no' || answer == 'n') {
            console.log(blue("Done"))
            console.log(dist1)
            console.log(dist2)
        } else {
            console.log(yellow("I assume you dont want to push")) && process.exit(69)
            console.log(dist1)
            console.log(dist2)
        }
    })

})
