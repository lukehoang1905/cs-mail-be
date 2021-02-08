const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const indexRouter = require("./routes/index");
const { response } = require("express");
const utilsHelper = require("./helpers/utils.helper");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

/**DB Connections*/
mongoose
  .connect(mongoURI, {
    //options to deal with dep
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongoose connected to ${mongoURI}`))
  .catch((err) => console.log(err));

/**Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  const statusCode = err.message.split(" - ")[0];
  const message = err.message.split(" - ")[1];
  if (!isNaN(statusCode)) {
    utilsHelper.sendResponse(res, statusCode, false, null, { message }, null);
  } else {
    utilsHelper.sendResponse(
      res,
      500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});
module.exports = app;
