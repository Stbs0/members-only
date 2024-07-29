const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const validationRules = require("../utils/validationRules");
const middlewares = require("../utils/middlewares");

router.get("/register", (req, res) => {
  res.render("sign-up-form");
});
router.post(
  "/register",
  validationRules.signUp(),
  middlewares.validate,
  authController.signUp,
);
router.get("/login", (req, res) => {
  res.render("log-in-form");
});

router.post(
  "/login",
  validationRules.logIn(),
  middlewares.validate,
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    successRedirect: "/",
  }),
);

module.exports = router;
