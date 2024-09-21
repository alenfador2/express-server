const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', postsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    status: 'failed',
    code: 500,
    message: `Internal server error ${err.message}, error: ${err.stack}`,
  });
});

module.exports = app;
