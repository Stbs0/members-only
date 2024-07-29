const db = require("../db/index");
const CostumeError = require("../utils/ErrorClass");
const asyncHandler = require("express-async-handler");

const joinClub = asyncHandler(async (req, res, next) => {

    await db.saveUserInClub(req.user.id, req.params.clubId);
    res.redirect("/")
})
module.exports = {
    joinClub
};
