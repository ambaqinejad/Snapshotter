const ftp = require("basic-ftp");

const path = require("path");

const { error, success } = require(path.join(
	"..",
	"constants",
	"responses.js"
));

module.exports = class FTPClient {
	constructor(
		host = "localhost",
		port = 21,
		user = "anonymous",
		password = "guest",
		secure = false
	) {
		this.client = new ftp.Client();
		this.client.ftp.verbose = true;
		this.settings = {
			host,
			user,
			password,
			secure,
		};
	}

	async upload(sourcePath, destinationDirectoryPath, destinationPath) {
		try {
			await this.client.access(this.settings);
			await this.client.ensureDir(destinationDirectoryPath);
			this.client.trackProgress((info) => {
				console.log("File", info.name);
				console.log("Type", info.type);
				console.log("Transferred", info.bytes);
				console.log("Transferred Overall", info.bytesOverall);
			});
			await this.client.uploadFrom(sourcePath, destinationPath);
			console.log(success.message.ftpUploadedSuccessfully);
		} catch (err) {
			console.log(error.message.ftpUploadedFailed);
			throw new Error(err.message);
			// throw new Error({
			// 	message: error.message.ftpUploadedFailed,
			// 	err: err.message,
			// 	code: error.code.serverErrorCode,
			// });
		} finally {
			this.client.close();
		}
	}
};
