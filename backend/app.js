// note: don't forget to use at the end 'GitGuardian' to check if the are any vulnerable lines of code :o
// note: also for ssl certificate use 'Let's Encrypt'

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config.env" });

const userRoute = require("./routes/userRoute");
const app = express();

const GEC = require("./controllers/GEC");
const SetUpError = require("./utils/errorConfig");

if (process.env.NODE_ENV === "developer") app.use(morgan("dev"));

// configuring app settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: process.env.ALLOWED_CORS_URL_API,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// routing
app.use("/api/v1", userRoute);

// this its required to be called after all routes, it will handle non-existing or misspelled api query
app.all("*", (req, res, next) => {
  next(new SetUpError(`Can't find ${req.originalUrl} on the server.`, 404));
});

app.use(GEC);

module.exports = app;
