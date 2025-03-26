const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/config.env" });

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

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
