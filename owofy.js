const en = require("./dist/translation/en.js")


const uwuifier = require('uwuify');

const uwuify = new uwuifier();

for (const key in en.default) {
    console.log(`${key}: "${uwuify.uwuify(en.default[key].toString())}",`);
}