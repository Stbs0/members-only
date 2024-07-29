const router = require("express").Router();
const createMessageController = require("../controllers/createMessageController");
const rules = require("../utils/validationRules");
const middleware=require('../utils/middlewares')
router.get("/", (req, res) => {
  res.render("create-message-form");
});
router.post("/", rules.createMessage(),middleware.validate, createMessageController);

module.exports = router
