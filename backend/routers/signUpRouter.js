const express = require("express");
const middlewares = require("../utils/middlewares");
const rules = require("../utils/validationRules");
const { createUserController } = require("../controllers/signUpController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("sign-up-form");
});
router.post(
  "/",
  rules.signUpValidationRules(),
  middlewares.validate,
  createUserController,
);

module.exports = router;