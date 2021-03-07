//import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });
require("./config/db");

const auth = require("./routes/auth");
const { Login } = require("./controllers/auth");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", auth);
app.use("/api/auth", Login);

// start server Configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `we are in ${process.env.NODE_ENV} mood and port is ${process.env.PORT}`
      .yellow.bold
  )
);

//unhandle process probelm
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
