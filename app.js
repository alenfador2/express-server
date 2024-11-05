const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const app = express();
// добавляем CORS
// app.options(
//   '*',
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'Accept',
//       'X-Requested-With',
//     ],
//   })
// );

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Accept, X-Requested-With'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

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
