const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const app = express();
// добавляем CORS

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'Accept',
//       'X-Requested-With',
//     ],
//   })
// );

app.options('', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With, X-CallbackType, Content-Type, Accept'
  );
  res.header('Cache-Control', 'no-cache');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
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
