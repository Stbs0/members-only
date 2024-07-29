const asyncHandler = require("express-async-handler");
const encryption = require("../utils/encryption");
const db = require("../db/queries");

const createUserController = asyncHandler(async (req, res,next) => {
  const { firstName, lastName, username, password } = req.body;

  const passwordHash = await encryption.encryptPassword(password);
  const rows = await db.saveUserIndb(
    firstName,
    lastName,
    username,
    passwordHash,
  );
  req.user = rows;
  next()
});

module.exports = {
  createUserController,
};
