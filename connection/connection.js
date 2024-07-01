const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_DB: dbURL } = process.env;

const connection = async () => {
  await mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = connection;
