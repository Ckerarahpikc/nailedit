const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/config.env" });

const https = require("https");
const fs = require("fs");
const app = require("../app");

// mongodb connection
mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING.replace(
      "<db_password>",
      process.env.MONGODB_PASSWORD
    )
  )
  .then(() => console.log("MongoDB connected."))
  .catch(console);

// Загрузка SSL-сертификатов
const sslOptions = {
  key: fs.readFileSync("../localhost+2-key.pem"),
  cert: fs.readFileSync("../localhost+2.pem"),
};

// Запуск HTTPS-сервера
const PORT = process.env.PORT || 443;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
