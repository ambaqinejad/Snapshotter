// Third Party Modules:
const express = require("express");

// Node.js Modules:
const path = require("path");

// My Modules:
const downloadValidator = require(path.join("..", "validators", "downloadValidator.js"));

// Router Initializing
const router = express.Router();

// Routing
router.post("/", downloadValidator.conditions(), downloadValidator.reqConditionValidator, function (req, res) {
    console.log(req.body);
})

module.exports = router;