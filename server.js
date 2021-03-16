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
const product = require("./routes/product");
const orders = require("./routes/orders");


const app = express();

// fix access to back-end
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_APP_HOST);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", auth);
app.use("/api/product", product);
app.use("/api/orders", orders);


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
