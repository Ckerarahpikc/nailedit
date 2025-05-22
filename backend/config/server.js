const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/config.env" });

const { Server } = require("socket.io");
const https = require("https");
const fs = require("fs");
const app = require("../app");

// HANDLE UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION 💥 Shutting down server...");
  console.error(error.name, error.message);
  process.exit(1); // crash app safely
});

// CONNECTION TO MONGODB (USING MONGOOSE)
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

// SSL CERTIFICATE
const sslOptions = {
  key: fs.readFileSync("../localhost+2-key.pem"),
  cert: fs.readFileSync("../localhost+2.pem"),
};

// RUNNING HTTPS SERVER WITH A CERTIFICATE
const PORT = process.env.PORT;
const server = https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 Server is running on https://localhost:${PORT}`);
});

// SOCKET SERVER
const io = new Server(server, {
  // options
  cors: {
    origin: process.env.ALLOWED_CORS_URL_API,
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

// HANDLING SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("🧩 User connected:", socket.id);

  // disconecting
  socket.on("disconnect", () => {
    console.log("💥 User disconected:", socket.id);
  });
});

// handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("UNCAUGHT REJECTION 💥 Shutting down server...");
  console.error(error.name, error.message);
  d;
  // gracefully close server
  server.close(() => {
    process.exit(1);
  });
});
