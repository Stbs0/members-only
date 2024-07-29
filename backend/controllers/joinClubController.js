const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const joinClub = asyncHandler(async (req, res, next) => {
  const clubName = req.body.club;
  await db.saveUserInClub(req.user.username, clubName);
  res.redirect("/");
});
module.exports = joinClub;
