const path = require("path");

const { error } = require(path.join("..", "constants", "responses.js"))

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

module.exports = {
    getFileExtension
}

