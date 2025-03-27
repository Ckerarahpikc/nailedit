const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config.env" });

const userRoute = require("./routes/testRoute");
const app = express();

if (process.env.NODE_ENV === "developer") app.use(morgan("dev"));

// configuring app settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routing
app.use("/api", userRoute);
app.get("*", (req, res) => res.send("api is working"));

module.exports = app;
