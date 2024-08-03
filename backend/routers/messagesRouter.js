const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const { validate, ...rules } = require("../utils/validation");
const middleware = require("../utils/middlewares");

router.get("/", messagesController.getMessages);

router.post(
  "/",
  middleware.isAuthenticated,
  rules.createMessage(),
  validate,
  messagesController.createMessage,
);

router.get(
  "/:id",
  rules.paramsToInt(),
  validate,
  messagesController.getSingleMessage,
);

router.put(
  "/:id",
  middleware.isAuthenticated,
  rules.checkUpdateMessage(),
  validate,
  messagesController.updateMessage,
);

router.delete(
  "/:id",
  middleware.isAuthenticated,
  rules.deleteMessage(),
  validate,
  messagesController.deleteMessage,
);

module.exports = router;
