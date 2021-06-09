const express = require("express");
const controllers = require("./controllers.js");

// Groups router "/group"
const router = express.Router();

router.post("/", controllers.emailGroups);
router.post("/santa", controllers.secretSanta);

module.exports = router;
