const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const { MONGO_DB: dbURL } = process.env;

let gfs;

const connection = async () => {
  try {
    const conn = await mongoose
      .connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 45000,
        socketTimeoutMS: 60000,
      })
      .then(() => console.log('Database connected successfully!'))
      .catch(err => console.log(`Something went wrong... ${err}`));

    const db = mongoose.connection.db;
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('images');

    return conn;
  } catch (err) {
    console.log(`Something went wrong...${err}`);
  }
};

module.exports = connection;
