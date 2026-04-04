// note: don't forget to use 'GitGuardian' to check if the are any vulnerable lines of code :o
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
const uploadRoute = require("./routes/uploadImage");
const settingsRoute = require("./routes/settingsRoute");
const appointmentRoute = require("./routes/appointmentRoute");
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
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// 3. STATIC FOLDER (images, videos, icons, stuff)
const staticPath = path.join(__dirname, "../client/dist");
// note: this should be changed in production

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
} else {
  console.warn("⚠️ Static directory not found. Skipping express.static().");
}

// 4. ROUTING
// api routes first
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/settings", settingsRoute);
app.use("/api/v1/appointments", appointmentRoute);

// SPA catch-all for GET requests (serves React app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html")); 
  // note: this should be changed in production
});

// 404 handler for non-GET requests to unmatched routes
app.all("*", (req, res, next) => {
  next(new SetUpError(`Can't find ${req.originalUrl} on the server.`, 404));
});

// 5. app GlobalErrorCatch
app.use(GEC);

module.exports = app;
