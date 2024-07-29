const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
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
  if (typeof err === "array") {
    console.log(
      "erro medil",
      err.map((e) => {
        return { message: e.msg, field: e.path };
      }),
    );
    res.status(400).send({
      errors: err.map((e) => {
        return { field: e.path, message: e.msg };
      }),
    });
  }
  if (err.name === "unAuthenticated") {
    res.send(err.message);
  }

  next(err);
};
const isAutherized = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({
      message: "you dont have access to the resource",
      name: "unAuthenticated",
    });
  }
};

module.exports = {
  validate,
  requestLogger,
  errorHandlerMiddleware,
  isAutherized,
};
