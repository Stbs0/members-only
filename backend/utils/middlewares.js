const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/ErrorClass");
// validation middlewares

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(errors.array());
  }
  next();
};

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
  });
};
const isAuthenticated = asyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new CustomError(
      401,
      "you dont have permission to access the resource","middleware auth"
    );
  }
});

module.exports = {
  validate,
  requestLogger,
  errorHandlerMiddleware,
  isAuthenticated,
};
