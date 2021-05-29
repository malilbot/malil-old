const en = require("./dist/translation/en.js");

const uwuifier = require("uwuify");

const uwuify = new uwuifier();

for (const key in en.default) {
	if (Array.isArray(en.default[key])) {
		let list = []
		en.default[key].forEach(item => {
			list.push(uwuify.uwuify(item))
		})


		console.log(`${key}: ${JSON.stringify(list)},`);

	} else {
		console.log(`${key}: "${uwuify.uwuify(en.default[key].toString())}",`);
	}

}
