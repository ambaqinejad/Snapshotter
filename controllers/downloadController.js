const fetch = require("node-fetch");

const fs = require("fs");
const path = require("path");

const { success, error } = require(path.join(
	"..",
	"constants",
	"responses.js"
));
const gpf = require(path.join("..", "helpers", "generalPurposeFunctions.js"));

module.exports = new (class DownloadController {
	async download(req, res, next) {
		try {
			const mediaLink = req.body.link;
			const response = await fetch(mediaLink);
			const mediaBuffer = await response.buffer();
			const downloadPath =
				req.body.fileName + gpf.getFileExtension(req.body.link);
			await fs.writeFile(downloadPath, mediaBuffer, () => {
				console.log(success.message.downloadedSuccessfully);
			});
			return downloadPath;
		} catch (err) {
			console.log(error.message.downloadFailed);
			throw new Error({
				message: error.message.downloadFailed,
				err: err.message,
				code: error.code.serverErrorCode,
			});
		}
	}
})();
