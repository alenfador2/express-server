const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const { MONGO_DB: dbURL } = process.env;

let gfs;

const connection = async () => {
  try {
    await mongoose
      .connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 45000,
        socketTimeoutMS: 60000,
      })
      .then(() => console.log('Database connected successfully!'))
      .catch(err => console.log(`Something went wrong... ${err}`));

    const conn = mongoose.connection;
    conn.once('open', () => {
      gfs = mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images',
      });
    });
  } catch (err) {
    console.log(`Something went wrong...${err}`);
  }
};

module.exports = { connection, gfs };
