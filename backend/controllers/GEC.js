// globale error configuration
require("dotenv").config();

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  switch (process.env.NODE_ENV) {
    case "production":
      res.status(err.statusCode).json({
        status: err.status,
        message: "Something went very wrong.",
      });
      break;

    case "development":
      const error = {
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
        stack: err.stack,
        path: err.path,
        value: err.value,
      };

      console.log(err.status);
      res.status(err.statusCode).json({ error });
  }
};
