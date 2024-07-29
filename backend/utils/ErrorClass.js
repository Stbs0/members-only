class CustomError extends Error {
  constructor(
    statusCode = 500,
    message = "internal server error",
    data = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.isCustomError = true;
  }
}

module.exports = CustomError;
