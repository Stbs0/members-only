const express = require("express");
const middlewares = require("../utils/middlewares");
const rules = require("../utils/validationRules");
const { createUserController } = require("../controllers/signUpController");
const passport = require('passport')
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sign-up-form");
});
router.post(
  "/",
  rules.signUpValidationRules(),
  middlewares.validate,
  createUserController,
  passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/' })
);

module.exports = router;
