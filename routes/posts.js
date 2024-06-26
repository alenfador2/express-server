const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/posts", postsController.get);

module.exports = router;
