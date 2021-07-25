const path = require("path");

const downloadController = require(path.join("..", "controllers", "downloadController.js"));
const FTPClient = require(path.join("..", "controllers", "ftpController.js"));
const { error, success } = require(path.join("..", "constants", "responses.js"));
// const removeFileController = require(path.join("..", "controllers", "removeFileController.js"));

const downloadUploadToFTPServerRemoveRespond = async (req, res, next) => {
    try {
        const localFilePath = await downloadController.download(req, res, next);
        const client = new FTPClient(process.env.ftpHost, process.env.ftpPort, 
            process.env.ftpUser,  process.env.ftpPassword, false);
        const ftpDirectoryPath = `/public_html/${req.body.socialNetwork}/${req.body.mediaType}/${req.body.path}`;
        const ftpFilePath = `${ftpDirectoryPath}/${localFilePath}`;
        await client.upload(res, localFilePath, ftpDirectoryPath, ftpFilePath);
        const mediaUrl = `${process.env.ftpDomain}/${req.body.socialNetwork}/${req.body.mediaType}/${req.body.path}/${localFilePath}`
        res.status(success.code.successCode).json({
            mediaUrl,
            message: "success"
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    downloadUploadToFTPServerRemoveRespond
}