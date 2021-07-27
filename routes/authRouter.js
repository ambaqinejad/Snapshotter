const express = require("express");

const path = require("path");

const authController = require(path.join(
	"..",
	"controllers",
	"authController.js"
));
const authValidator = require(path.join(
	"..",
	"validators",
	"authValidator.js"
));

const router = express.Router();

router.post(
	"/login",
	authValidator.conditions(),
	authValidator.reqConditionValidator,
	authController.login
);
// router.post("/signUp", authController.signUp);
// router.post("/getUsers", authController.getUsers);

module.exports = router;
