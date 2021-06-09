const express = require("express");
const email = require("./email.js");
const router = require("./routes.js");

const port = process.env.PORT || 2000;
const publicPath = __dirname + "/../client";

email.setupEmail().catch(console.error);

const app = express();
app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (req, res) => res.sendFile(publicPath + "/index.html"));
app.use("/group", router);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
