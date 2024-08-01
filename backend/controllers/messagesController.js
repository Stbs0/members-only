const db = require("../db/index");
const asyncHandler = require("express-async-handler");
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
  if (!req.user || !req.user.clubs.includes(message.club_id)) {
     delete message.username;
     return res.json(message);
  }else{
         return res.json(message);

  }
});

const updateMessage = asyncHandler(async(req,res,next)=>{

  const {title,text} = req.body;
  const messageId = req.params.id;
  const newMessage = await db.updateMessage(messageId,title,text);
  if (!newMessage) {
    throw new CustomError(null, "message not found", 404);
  }
  if (req.user.id !== newMessage.user_id) {
    throw new CustomError(null,401, "unauthorized");
  }
  res.status(201).json(newMessage);
})

const deleteMessage = asyncHandler(async(req,res,next)=>{

  const messageId = req.params.id;
  const message = await db.getMessageById(messageId);
  if (!message) {
    throw new CustomError(null, "message not found", 404);
  }
  if (req.user.username !== message.username) {
    throw new CustomError(null, 401, "unauthorized");
  }
  await db.deleteMessage(messageId);
  res.status(204)
})



module.exports = {
  getMessages,
  createMessage,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
