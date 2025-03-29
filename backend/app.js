const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config.env" });

const userRoute = require("./routes/testRoute");
const app = express();

const GEC = require("./controllers/GEC");
const SetUpError = require("./utils/errorConfig");

if (process.env.NODE_ENV === "developer") app.use(morgan("dev"));

// configuring app settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routing
app.use("/api/v1", userRoute);

// this its required to be called after all routes, it will handle non-existing or misspelled api query
app.all('*', (req, res, next) => {
  next(new SetUpError(`Can't find ${req.originalUrl} on the server.`, 404));
});

app.use(GEC);

module.exports = app;
