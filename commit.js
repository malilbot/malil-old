var readline = require('readline');
const {green, red, blue, yellow} = require("chalk")
const {exec} = require("child_process");
const {exit} = require('process');
var rl = readline.createInterface({input: process.stdin, output: process.stdout});
let out = ''
rl.question(green("What is the commit message?:  "), function (answer) {

    exec(`git add --all`, async (error, stdout, stderr) => {
        out = error || stderr || stdout
    })
    console.log(out)
    eval(exec(`git commit -m "${answer}"`, async (error, stdout, stderr) => {

        out = error || stderr || stdout
    }))
    rl.question(green(out + "\nDO you want to push?:  "), function (answer) {
        if (answer == 'yes' || answer == 'y') {
            exec(`git push`, async (error, stdout, stderr) => {
                out = error || stderr || stdout

            })
            console.log(blue(out + "\nPushed the commit")) && exit(69)

        } else if (answer == 'no' || answer == 'n') 
            return console.log(blue("Done")) && exit(69)


         else 
            return console.log(yellow("I assume you dont want to push")) && exit(69)


        


    })
})
