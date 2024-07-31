const asyncHandler = require("express-async-handler");
const encryption = require("../utils/encryption");
const db = require("../db/index");
const CustomError = require("../utils/ErrorClass");

const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  const passwordHash = await encryption.encryptPassword(password);
  const user = await db.saveUser(firstName, lastName, username, passwordHash);
  req.logIn(user, (err) => {
    if (err) {
      throw new CustomError( err);
    }
    res.redirect("/api/messages");
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const userId = req.user.id;
  const hash = await encryption.encryptPassword(password);
  await db.changePassword(userId, hash);

  res.redirect("/");
});

module.exports = {
  signUp,
  resetPassword,
};
