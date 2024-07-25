const express = require("express");
const {
  validate,
  signUpValidationRules,
} = require("../utils/middlewares/validationMiddleware");
const {createUserController} = require("../controllers/signUpController");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("sign-up-form");
});
router.post("/", signUpValidationRules(), validate, createUserController);

module.exports = router;
