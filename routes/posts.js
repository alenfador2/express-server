const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const fileMiddleware = require("../middlewares/upload");

router.get("/posts", postsController.get);
router.post("/posts", fileMiddleware.single("image"), postsController.post);

module.exports = router;
