// Third Party Modules:
const express = require("express");
require("dotenv").config();

// Node.js Modules:
const path = require("path");

// My Modules:
const downloadRouter = require(path.join(__dirname, "routes", "downloadRouter.js"));

// Server Initializing
const PORT = process.env.PORT || 3000;
const app = express();

// Server Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/download', downloadRouter);
// Using Routes and Middleware

// Running the Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});