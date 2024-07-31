class CustomError extends Error {
  constructor(
    data = null,
    statusCode = 500,
    message = "internal server error",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.isCustomError = true;
  }
}

module.exports = CustomError;
