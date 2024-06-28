const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const fileMiddleware = require("../middlewares/upload");

router.get("/api/posts", postsController.get);
router.post("/api/posts", fileMiddleware.single("image"), postsController.post);

module.exports = router;
