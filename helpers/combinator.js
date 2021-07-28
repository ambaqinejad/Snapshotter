const path = require("path");
const fs = require("fs");

const downloadController = require(path.join(
	"..",
	"controllers",
	"downloadController.js"
));
const FTPClient = require(path.join("..", "controllers", "ftpController.js"));
const gpf = require(path.join("..", "helpers", "generalPurposeFunctions.js"));
const { error, success } = require(path.join(
	"..",
	"constants",
	"responses.js"
));
// const removeFileController = require(path.join("..", "controllers", "removeFileController.js"));

const downloadUploadToFTPServerRemoveRespond = async (req, res, next) => {
	let statusNumber = 0;
	let localFilePath = "";

	try {
		localFilePath = await downloadController.download(req, res, next);
		statusNumber = 1;
		const client = new FTPClient(
			process.env.ftpHost,
			process.env.ftpPort,
			process.env.ftpUser,
			process.env.ftpPassword,
			true
		);
		const ftpDirectoryPath = `/public_html/${req.body.socialNetwork}/${req.body.mediaType}/${req.body.path}`;
		const ftpFilePath = `${ftpDirectoryPath}/${localFilePath}`;
		await client.upload(localFilePath, ftpDirectoryPath, ftpFilePath);
		statusNumber = 2;
		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
		statusNumber = 3;
		const mediaUrl = `${process.env.ftpDomain}/${req.body.socialNetwork}/${req.body.mediaType}/${req.body.path}/${localFilePath}`;

		res.status(success.code.successCode).json({
			mediaUrl,
			message: "success",
		});
	} catch (err) {
		if (
			localFilePath !== "" &&
			statusNumber === 1 &&
			fs.existsSync(localFilePath)
		) {
			fs.unlinkSync(localFilePath);
		}
		console.log(err);
		res.status(error.code.serverErrorCode).json({
			message: err.message || "خطا در فرآیند",
			err: err.err || "خطا در فرآیند",
		});
	}
};

module.exports = {
	downloadUploadToFTPServerRemoveRespond,
};
