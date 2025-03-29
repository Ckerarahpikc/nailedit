exports.catchAsync = (callback) => {
  return (err, req, res, next) => {
    next(callback(err));
  };
};
