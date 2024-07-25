const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(
    "erro medil",
    err.map((e) =>  { return {message: e.msg, field: e.path} }),
  );
  if (typeof err === "array") {
    res.status(400).send({
      errors: err.map((e) => {
        return { field: e.path, message: e.msg };
      }),
    });
  }
  next(err);
};
module.exports = errorHandlerMiddleware;
