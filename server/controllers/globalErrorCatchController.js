// global error configuration
const { handleErrorsType } = require("../utils/handleErrorsType");
require("dotenv").config();

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const handledError = handleErrorsType(err.name || err.code, err) || err;

  if (process.env.NODE_ENV == "development") {
    return res.status(handledError.statusCode).json({
      status: handledError.statusCode,
      error: handledError,
      message: handledError.message,
      stack: handledError.stack,
    });
  }

  if (handledError.isOperational) {
    return res.status(handledError.statusCode).json({
      status: "fail",
      message: handledError.message,
      error: handledError.errorMessages,
    });
  }

  return res.status(handledError.statusCode).json({
    status: "error",
    message: "Something went wrong. Try again later.",
  });
};
