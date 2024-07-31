const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const {validate,...rules} = require("../utils/validation");
const { isAuthenticated } = require("../utils/middlewares");

router.get("/register", (req, res) => {
  res.render("sign-up-form");
});
router.post(
  "/register",
  rules.signUp(),
  validate,
  authController.signUp,
);


router.post(
  "/login",
  rules.logIn(),
  validate,
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    successRedirect: "/",
  }),
);

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// router.post(
//   "/forgot-password",
//   rules.checkPassword(),
//   validate,
//   authController.resetPassword,
// );

module.exports = router;
