const fetch = require("node-fetch");
const FileType = require("file-type");
const hbjs = require("handbrake-js");

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
			const extension = await FileType.fromBuffer(mediaBuffer);
			const downloadPath = `${req.body.fileName}.${extension.ext}`;
			// + gpf.getFileExtension(req.body.link);
			fs.writeFileSync(downloadPath, mediaBuffer);
			if (req.body.mediaType === "video" && extension.ext !== "mp4") {
				return new Promise((resolve, reject) => {
					const convertPath = `${req.body.fileName}.mp4`;
					hbjs.spawn({
						input: downloadPath,
						output: convertPath,
					})
						.on("error", (err) => {
							if (fs.existsSync(convertPath)) {
								fs.unlinkSync(convertPath);
							}
							reject(error.message.conversionError);
						})
						.on("progress", (progress) => {
							console.log(
								`Percent complete: ${progress.percentComplete}, ETA: ${progress.eta}`
							);
						})
						.on("complete", () => {
							console.log(success.message.convertedSuccessfully);
							console.log(success.message.downloadedSuccessfully);
							if (fs.existsSync(downloadPath)) {
								fs.unlinkSync(downloadPath);
							}
							resolve(convertPath);
						});
				});
			} else {
				console.log(success.message.downloadedSuccessfully);
				return new Promise((resolve, reject) => {
					resolve(downloadPath);
				});
			}
		} catch (err) {
			console.log(error.message.downloadFailed);
			throw new Error(err.message);
			// throw new Error({
			// 	message: error.message.downloadFailed,
			// 	err: err.message,
			// 	code: error.code.serverErrorCode,
			// });
		}
	}
})();
