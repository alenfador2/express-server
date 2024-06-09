const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const postsRouter = require("./routes/posts");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    status: "failed",
    code: 500,
    message: "Internal server error",
  });
});

module.exports = app;
