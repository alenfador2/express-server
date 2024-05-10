const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_DB: dbURL } = process.env;

const connection = mongoose.connect(dbURL);

module.exports = connection;
