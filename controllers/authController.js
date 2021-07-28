const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { success, error } = require(path.join(
	"..",
	"constants",
	"responses.js"
));

const USERS_DB_ADDRESS = path.join("database", "users.json");

module.exports = new (class AuthController {
	async login(req, res, next) {
		try {
			const { username, password } = req.body;

			const users = JSON.parse(fs.readFileSync(USERS_DB_ADDRESS));

			let _user = null;

			for (const user of users) {
				if (
					user.username === username &&
					(await bcrypt.compare(password, user.password))
				) {
					_user = user;
					break;
				}
			}

			if (_user) {
				jwt.sign(
					{ _user },
					process.env.JWT_SECRET_KEY,
					(err, token) => {
						if (err)
							throw new Error(error.message.assignTokenUpFailed);

						return res.status(success.code.successCode).json({
							message: success.message.loggedInSuccessfully,
							username: _user.username,
							token,
						});
					}
				);
			} else {
				res.status(error.code.notFoundErrorCode).json({
					message: error.message.userPassError,
				});
			}
		} catch (err) {
			return res.status(error.code.serverErrorCode).json({
				message: error.message.loginFailed,
				error: err.message,
			});
		}
	}

	async signUp(req, res, next) {
		try {
			const { username, password } = req.body;

			const users = JSON.parse(fs.readFileSync(USERS_DB_ADDRESS));

			const userDoesExist = users.filter(
				(user) => user.username === username
			);
			if (userDoesExist.length > 0) {
				return res.status(error.code.dataErrorCode).json({
					message: error.message.usernameExistError,
				});
			}
			const saltRound = 10;
			const salt = await bcrypt.genSalt(saltRound);
			const hashPassword = await bcrypt.hash(password, salt);
			users.push({
				username,
				password: hashPassword,
				token: "",
			});

			fs.writeFileSync(USERS_DB_ADDRESS, JSON.stringify(users));

			return res.status(success.code.successCode).json({
				message: success.message.signedUpSuccessfully,
			});
		} catch (err) {
			return res.status(error.code.serverErrorCode).json({
				message: error.message.signUpFailed,
				error: err.message,
			});
		}
	}

	getUsers(req, res, next) {}
})();
