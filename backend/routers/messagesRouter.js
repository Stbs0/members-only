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


module.exports = router;
