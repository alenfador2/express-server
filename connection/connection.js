const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_DB: dbURL } = process.env;

const connection = async () => {
  await mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 45000,
      socketTimeoutMS: 60000,
    })
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.log(`Something went wrong... ${err}`));
};

module.exports = connection;
