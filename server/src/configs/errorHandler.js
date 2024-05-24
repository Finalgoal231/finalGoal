// 404 - not found error handler
exports.notFoundRoute = (req, res, next) => {
  res.status(404).json({ message: "Sorry! Your request page was not found." });
};

exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next("Something went wrong.");
  } else {
    if (err.message) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "There was an error." });
    }
  }
};
