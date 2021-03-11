const express = require("express");

const port = process.env.PORT || 2000;
const publicPath = __dirname + "/../client/dist";

const app = express();
app.use(express.static(publicPath));
app.get('/', (req, res) => res.sendFile(publicPath + "/index.html"));

app.listen(port, () => console.log(`Server listening on port ${port}...`));
