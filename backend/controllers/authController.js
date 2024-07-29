const asyncHandler = require("express-async-handler");
const encryption = require("../utils/encryption");
const db = require("../db/index");


const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  const passwordHash = await encryption.encryptPassword(password);
  const user = await db.saveUser(firstName, lastName, username, passwordHash);
  delete user.hash;

  res.redirect("/auth/login");
});




module.exports = {
  signUp,
};
