// global error configuration
const { handleErrorsType } = require("../utils/handleErrorsType");
require("dotenv").config();

// ^ PROD ERROR - error handler for people
const prodErrConfig = (err, req, res) => {
  res.status(err.statusCode).json({
    status: "Something went very wrong.",
    message: err.message,
    errors: err.errorMessages,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const handledError = handleErrorsType(err.name, err) || err;

  switch (process.env.NODE_ENV) {
    case "production":
      const errorForProduction = {
        status: handledError.status,
        statusCode: handledError.statusCode,
        message: handledError.message,
        errors: handledError.errorMessages,
      };
      prodErrConfig(errorForProduction, req, res);
      break;

    case "development":
      const errorForDevelopment = {
        statusCode: handledError.statusCode,
        status: handledError.status,
        message: handledError.message,
        errors: handledError.errorMessages,
        stack: handledError.stack,
        path: handledError.path,
        value: handledError.value,
      };
      res.status(handledError.statusCode).json(errorForDevelopment);
      break;
  }
};
