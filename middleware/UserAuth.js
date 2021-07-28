const path = require("path");
const jwt = require("jsonwebtoken");

const { error } = require(path.join("..", "constants", "responses.js"));

module.exports = new (class UserAuth {
	setTokenToRequest(req, res, next) {
		try {
			const token = req.headers["x-access-token"];
			if (typeof token === "undefined") {
				throw new Error(error.message.forbiddenRequest);
			}
			// const token = bearerToken.split(" ")[1];
			req.token = token;
			next();
		} catch (err) {
			res.status(error.code.forbidden).json({
				message: err.message,
			});
		}
	}

	verifyToken(req, res, next) {
		jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, data) => {
			if (err) {
				res.send(error.code.forbidden).json({
					message: err.message,
				});
			} else {
				next();
			}
		});
	}
})();
