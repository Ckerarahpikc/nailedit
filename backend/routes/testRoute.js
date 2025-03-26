const express = require("express");
const { getComments } = require("../controllers/testController");
const router = express.Router();

router.get("/comments", getComments);

module.exports = router;
