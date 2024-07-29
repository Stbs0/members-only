const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const createMessagesController = asyncHandler(async (req, res, next) => {
  await db.saveMessage(req.body.title, req.body.message, req.user.id, req);
  res.redirect("/");
});
module.exports = createMessagesController;
