const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/config.env" });

const https = require("https");
const fs = require("fs");
const app = require("../app");

// 1. handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION 💥 Shutting down server...");
  console.error(error.name, error.message);
  process.exit(1); // crash app safely
});

// 2. connection to mongodb (using mongoose)
mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING.replace(
      "<db_password>",
      process.env.MONGODB_PASSWORD
    )
  )
  .then(() => console.log("MongoDB connected."))
  .catch((error) => {
    console.error("⛔ MONGODB CONNECTION FAILED");
    console.error(error);
    process.exit(1); // shutting down safely
  });

// 3. ssl certificate
const sslOptions = {
  key: fs.readFileSync("../localhost+2-key.pem"),
  cert: fs.readFileSync("../localhost+2.pem"),
};

// 4. running https server with proper certificate
const PORT = process.env.PORT || 443;
const server = https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 Server is running on https://localhost:${PORT}`);
});

// 5. handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("UNCAUGHT REJECTION 💥 Shutting down server...");
  console.error(error.name, error.message);

  // gracefully close server
  server.close(() => {
    process.exit(1);
  });
});
