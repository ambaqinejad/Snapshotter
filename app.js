// Third Party Modules:
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Node.js Modules:
const path = require("path");

// My Modules:
const downloadRouter = require(path.join(
	__dirname,
	"routes",
	"downloadRouter.js"
));

const authRouter = require(path.join(__dirname, "routes", "authRouter.js"));

// Server Initializing
const PORT = process.env.PORT || 3000;
const app = express();

// Server Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using Routes and Middleware
app.use("/download", downloadRouter);
app.use("/auth", authRouter);

// Running the Server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
