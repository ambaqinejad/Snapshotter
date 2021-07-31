const FileType = require("file-type");
const fs = require("fs");

const fetch = require("node-fetch");

// (async () => {
// 	console.log(await FileType.fromFile("./am"));
// 	fs.rename("./am", "./am.jpg", (err) => {
// 		if (err) console.log("err");
// 	});
// })();

(async () => {
	const response = await fetch(
		"https://lh3.googleusercontent.com/proxy/ZsB9w4fElJ4axAn_lYKfehFidASmUGhjlTKiNLQ42_0mW5B4DofB79ucz0TTCVVlv2JubhXckz39X8pfudg8eiPuv_pojP6-HmPhtAs11FiUaioOqg"
	);
	const mediaBuffer = await response.buffer(response);
	console.log(await FileType.fromBuffer(mediaBuffer));
})();
