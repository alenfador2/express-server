const mongoose = require('mongoose');
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
      console.log('GridFS successfully connected! ');
    });
  } catch (err) {
    console.log(`Something went wrong...${err}`);
  }
};

const getGFs = () => {
  if (!gfs) {
    throw new Error(
      'GridFS is not initialized. Please ensure the database connection is established.'
    );
  }
  return gfs;
};

module.exports = { connection, getGFs };
