const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const joinClub = asyncHandler(async (req, res, next) => {
    const clubName = req.body.club;
    const userPasscode = req.body.passcode;
  await db.saveUserInClub(clubName);
});
module.exports = joinClub;
