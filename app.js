const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    status: "failed",
    code: 500,
    message: "Internal server error",
  });
});

module.exports = app;
