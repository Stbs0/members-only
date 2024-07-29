const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const validation = require("../utils/validation");
const middleware = require("../utils/middlewares");

router.get("/", messagesController.getMessages);

router.post(
  "/",
  middleware.isAuthenticated,
  validation.createMessage(),
  validation.validate,
  messagesController.createMessage,
);

module.exports = router;
