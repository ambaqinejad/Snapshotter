const path = require("path");

const imageToBase64 = require("image-to-base64")

const { success, error } = require(path.join("..", "constants", "responses.js"))

const getFileExtension = (mediaLink) => {
    const ext = path.extname(mediaLink);
    const extArray = ['.png', '.jpeg', '.jpg', '.PNG', '.JPEG', '.JPG', '.gif', '.mp4'];

    for (const e of extArray) {
        if (ext.includes(e)) {
            return e
        }
    }

    throw new Error(error.message.invalidExtension)
}

const convertImageToBase64 = async (imageUrl) => {
    try {
        const response = await imageToBase64(imageUrl);
        console.log(success.message.convertedImageToBase64Successfully);
        return response;
    } catch (error) {
        console.log(error.message.convertImageToBase64Failed);
        throw new Error({
            message: error.message.convertImageToBase64Failed,
            err: err.message,
            code: error.code.serverErrorCode
        });
    }
}

module.exports = {
    getFileExtension,
    convertImageToBase64,
}

