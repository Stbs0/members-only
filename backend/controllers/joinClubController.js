const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const joinClub = asyncHandler(async (req, res, next) => {
  const clubName = req.body.club;
  // hardcoded the username with stbs0
  await db.saveUserInClub("stbs0", clubName);
  res.redirect("/");
});
module.exports = joinClub;
