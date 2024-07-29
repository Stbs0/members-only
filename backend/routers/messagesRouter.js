const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const rules = require("../utils/validationRules");
const middleware = require("../utils/middlewares");
router.get("/", messagesController.getMessages);
router.post(
  "/",
  middleware.isAuthenticated,
  rules.createMessage(),
  middleware.validate,
  messagesController.createMessage,
);

module.exports = router;
