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
    message: "Internal Server Error",
    err,
  });
};

// auth middleware
/* 
@param {array} - value of the user

*/
const isAuthenticated = asyncHandler((req, res, next) => {
  if (req.isAuthenticated() || req.user.role === "site_admin") {
    return next();
  } else {
    throw new CustomError(
      null,
      401,
      "you don't have permission to access the resource",
      "middleware auth",
    );
  }
});

const unknownEndpoint = asyncHandler((req, res, next) => {
  throw new CustomError(null, 404, "endpoint not found", "unknown endpoint");
});

module.exports = {
  requestLogger,
  errorHandlerMiddleware,
  isAuthenticated,
  unknownEndpoint,
};
