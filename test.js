const fetch = require("node-fetch");

const response = await fetch(mediaLink);
const mediaBuffer = await response.buffer();
const downloadPath = req.body.fileName + gpf.getFileExtension(req.body.link);
await fs.writeFile(downloadPath, mediaBuffer, () => {
	console.log(success.message.downloadedSuccessfully);
});
