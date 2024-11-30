const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");

router.post("/", controller.signUp);

module.exports = router;
