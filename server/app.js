const express = require("express");
const email = require("./email.js");
const router = require("./routes.js");

// The port the web server will be running on. Checks environment variables then defaults to 2000.
const port = process.env.PORT || 2000;

// The directory that will be available publically for users
const publicPath = __dirname + "/../client";

// Setup email transporter
email.setupEmail();

// Create express app with json body-parser and access to the public directory
const app = express();
app.use(express.json());
app.use(express.static(publicPath));

// HTTP Request Routing
app.get("/", (req, res) => res.sendFile(publicPath + "/index.html"));
app.use("/group", router);

// Run Server
app.listen(port, () => console.log(`Server listening on port ${port}...`));
