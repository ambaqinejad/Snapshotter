const path = require("path");

const users = require(path.join("..", "database", "users.js"));
const { success, error } = require(path.join(
	"..",
	"constants",
	"responses.js"
));

module.exports = new (class AuthController {
	constructor() {
		this.users = users;
	}

	login(req, res, next) {
		const { username, password } = req.body;
		const user = users.filter(
			(user) => user.username === username && user.password === password
		);

		if (user.length > 0) {
			return res.status(success.code.successCode).json({
				message: success.message.loggedInSuccessfully,
				user: user[0],
			});
		}
		res.status(error.code.notFoundErrorCode).json({
			message: error.message.userPassError,
		});
	}

	singUp(req, res, next) {
		const { username, password } = req.body;
		// .bail()
		// 		.custom((value, { req }) => {
		// 			const userDoesExist = users.filter(
		// 				(user) => user.username === value
		// 			);
		// 			if (userDoesExist) {
		// 				throw new Error(error.message.usernameExistError);
		// 			} else {
		// 				return true;
		// 			}
		// 		}),
	}

	getUsers(req, res, next) {}
})();
