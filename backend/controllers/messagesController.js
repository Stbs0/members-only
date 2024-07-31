const db = require("../db/index");
const asyncHandler = require("express-async-handler");
const CostumeError = require("../utils/ErrorClass");
const CustomError = require("../utils/ErrorClass");

const getMessages = asyncHandler(async (req, res, next) => {
  const userClubs = req.user ? req.user.clubs : [];

  const allMessages = await db.getMessages(userClubs);

  const messages = allMessages.map((message) => {
    if (!userClubs.includes(message.club_id)) {
      delete message.username;
    }
    return message;
  });

  return res.json(messages);
});

const createMessage = asyncHandler(async (req, res, next) => {
  const { title, message, clubId } = req.body;

  const result = await db.saveMessage(title, message, req.user.id, clubId);
  res.status(201).json(result);
});

const getSingleMessage = asyncHandler(async (req, res, next) => {
  const messageId = req.params.id;
  const message = await db.getMessageById(messageId);
  console.log(message)
  if (!message) {
    throw new CustomError(null, "message not found", 404);
  }
  console.log(req.user)
  if (!req.user || !req.user.clubs.includes(message.club_id)) {
     delete message.username;
     return res.json(message);
  }else{
         return res.json(message);

  }
});

// const getClubsMessages = asyncHandler(async (req, res, next) => {
//   const messages = await db.getMembersMessages(req.user.clubs);
//   res.json(messages);
// });

module.exports = { getMessages, createMessage, getSingleMessage };
