const db = require("../db/index");
const CostumeError = require("../utils/ErrorClass");
const asyncHandler = require("express-async-handler");

const getUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await db.getUserById(userId);
  if (!user) {
    throw new CostumeError(404, "user not found", 0);
  } else {
    delete user.hash;
    res.json(user);
  }
});

const updateUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { firstName = null, lastName = null, username = null } = req.body;
  const user = await db.updateUser(userId, username, firstName, lastName);
  if (!user) {
    throw new CostumeError(404, "user not found", 1);
  } else {
    res.json(user);
  }
});
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await db.deleteUserDB(userId);
  if (!user) {
    throw new CostumeError(404, "user not found", 2);
  } else {
    res.status(204).end();
  }
});

module.exports = { getUserInfo, updateUserInfo, deleteUser };
