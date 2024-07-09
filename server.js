const app = require("./app");
const connection = require("./connection/connection");
require("dotenv").config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connection();

    if (connection) {
      console.log("Database successfully connection");
    } else {
      console.log("Something went wrong...");
    }

    app.listen(port, () => {
      console.log(`server running at port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
