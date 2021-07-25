// Third Party Modules:
const express = require("express");

// Node.js Modules:
const path = require("path");

// My Modules:

// Validators
const downloadValidator = require(path.join("..", "validators", "downloadValidator.js"));

// Helpers
const combinator = require(path.join("..", "helpers", "combinator.js"));

// Router Initializing
const router = express.Router();

// Routing
router.post("/", 
    downloadValidator.conditions(), 
    downloadValidator.reqConditionValidator, 
    combinator.downloadUploadToFTPServerRemoveRespond
)

module.exports = router;