const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', postsRouter);
app.use('/', authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    status: 'failed',
    code: 500,
    message: `Internal server error ${err.message}, error: ${err.stack}`,
  });
});

module.exports = app;
