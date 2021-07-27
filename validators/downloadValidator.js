// Third Party Modules:
const { body, validationResult } = require("express-validator");

// Node.js Modules:
const path = require("path");

// My Modules
const { error } = require(path.join("..", "constants", "responses.js"));

module.exports = new (class DownloadValidator {
	conditions(req) {
		return [
			body("link")
				.custom((value, { req }) => {
					if (!value || value === null || value === undefined) {
						throw new Error(error.message.linkIsRequired);
					} else {
						return true;
					}
				})
				.bail()
				.isURL()
				.withMessage(error.message.invalidLink),
			body("mediaType")
				.custom((value, { req }) => {
					if (!value || value === null || value === undefined) {
						throw new Error(error.message.mediaTypeIsRequired);
					} else {
						return true;
					}
				})
				.bail()
				.custom((value, { req }) => {
					if (!["image", "video"].includes(value)) {
						throw new Error(error.message.invalidMediaType);
					} else {
						return true;
					}
				}),
			body("path").custom((value, { req }) => {
				if (!value || value === null || value === undefined) {
					throw new Error(error.message.pathIsRequired);
				} else {
					return true;
				}
			}),
			body("socialNetwork")
				.custom((value, { req }) => {
					if (!value || value === null || value === undefined) {
						throw new Error(error.message.socialNetworkIsRequired);
					} else {
						return true;
					}
				})
				.bail()
				.custom((value, { req }) => {
					if (!["twitter", "instagram", "telegram"].includes(value)) {
						throw new Error(error.message.invalidSocialNetwork);
					} else {
						return true;
					}
				}),
			body("fileName")
				.custom((value, { req }) => {
					if (!value || value === null || value === undefined) {
						throw new Error(error.message.fileNameIsRequired);
					} else {
						return true;
					}
				})
				.bail(),
		];
	}

	reqConditionValidator(req, res, next) {
		const errorResults = validationResult(req);
		if (!errorResults.isEmpty()) {
			const errors = errorResults.array();
			const errMessages = errors.map((err) => err.msg);
			return res.status(error.code.dataErrorCode).json({
				message: errMessages,
				type: "validation",
			});
		}
		next();
	}
})();
