const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/ErrorClass");



// logger middleware

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// error handling middleware

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("error", err);
  if (err?.isCustomError) {
    return res.status(err.statusCode).json({ ...err, message: err.message });
  }
  res.status(500).json({
    message: "Internal Server Error", err
  });
};

// auth middleware
const isAuthenticated = asyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    throw new CustomError(
      401,
      "you don't have permission to access the resource",
      "middleware auth",
    );
  }
});
const clubIdParams = asyncHandler((req, res, next) => {
  const isMatch = req.user.clubs.includes(req.params.clubId);

  if (isMatch) {
    return next();
  } else {
    throw new CustomError(
      401,
      "you dont have permission to access the resource",
      "middleware auth",
    );
  }
});

const unknownEndpoint = asyncHandler((req, res, next) => {
  throw new CustomError(404, "endpoint not found", "unknown endpoint");
});

module.exports = {
  requestLogger,
  errorHandlerMiddleware,
  isAuthenticated,
  unknownEndpoint,
  clubIdParams,
};
