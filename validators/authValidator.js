// Third Party Modules:
const { body, validationResult } = require("express-validator");

// Node.js Modules:
const path = require("path");

// My Modules
const { error } = require(path.join("..", "constants", "responses.js"));

module.exports = new (class DownloadValidator {
	conditions(req) {
		return [
			body("username").custom((value, { req }) => {
				if (!value || value === null || value === undefined) {
					throw new Error(error.message.usernameIsRequired);
				} else {
					return true;
				}
			}),
			body("password").custom((value, { req }) => {
				if (!value || value === null || value === undefined) {
					throw new Error(error.message.passwordIsRequired);
				} else {
					return true;
				}
			}),
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
