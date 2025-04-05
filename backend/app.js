const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config.env" });

const userRoute = require("./routes/userRoute");
const app = express();

const GEC = require("./controllers/GEC");
const SetUpError = require("./utils/errorConfig");

if (process.env.NODE_ENV === "developer") app.use(morgan("dev"));
console.log("cors:", process.env.URL_API);

// configuring app settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: process.env.URL_API,
  // origin: "https://localhost:1111/api/v1",
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
