const asyncHandler = require("express-async-handler");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const createUserController = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log("hash", passwordHash);
  const [rows] = await db.saveUserIndb(firstName, lastName, username, passwordHash);
  console.log("signup", rows);
  res.redirect("/");
});

module.exports = {
  createUserController,
};
