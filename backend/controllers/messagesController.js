const db = require("../db/index");
const asyncHandler = require("express-async-handler");
const CostumeError = require("../utils/ErrorClass");
const getMessages = asyncHandler(async (req, res, next) => {
  let messages;
  if (req.user?.clubs.length > 0) {
    messages = await db.getMembersMessages(req.user.clubs);
    return res.json(messages);
  }
  messages = await db.getAllMessages();
  res.json(messages);
});

const createMessage = asyncHandler(async (req, res, next) => {
  const { title, message, clubId } = req.body;

  const result = await db.saveMessage(title, message, req.user.id, clubId);
  res.status(201).json(result);
});

// const getClubsMessages = asyncHandler(async (req, res, next) => {
//   const messages = await db.getMembersMessages(req.user.clubs);
//   res.json(messages);
// });

module.exports = { getMessages, createMessage };
