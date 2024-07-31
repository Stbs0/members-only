const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const {validate,...rules} = require("../utils/validation");
const middleware = require("../utils/middlewares");

router.get("/", messagesController.getMessages);

router.post(
  "/",
  middleware.isAuthenticated,
  rules.createMessage(),
  validate,
  messagesController.createMessage,
);

router.get("/:id", rules.getMessage(),validate, messagesController.getSingleMessage);

module.exports = router;
