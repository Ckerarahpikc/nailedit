// note: don't forget to use at the end 'GitGuardian' to check if the are any vulnerable lines of code :o
// note: also for ssl certificate use 'Let's Encrypt'

require("dotenv").config({ path: __dirname + "/config.env" });
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const userRoute = require("./routes/userRoute");
const app = express();

const GEC = require("./controllers/GEC");
const SetUpError = require("./utils/errorConfig");

// 1. use morgan in dev mode
if (process.env.NODE_ENV === "developer") app.use(morgan("dev"));

// 2. app settings / security / utility
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
const corsOptions = {
  origin: process.env.ALLOWED_CORS_URL_API,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// 3. configure static folder
const staticPath = path.join(__dirname, "uploads/avatars");
if (fs.existsSync(staticPath)) {
  app.use("/avatars", express.static(staticPath));
} else {
  console.warn(
    "⚠️ Static directory not found. Skipping express.static() for avatars folder"
  );
}

// 4. routing (api)
app.use("/api/v1", userRoute);
app.all("*", (req, res, next) => {
  next(new SetUpError(`Can't find ${req.originalUrl} on the server.`, 404));
});

// 5. app GlobalErrorCatch
app.use(GEC);

module.exports = app;
