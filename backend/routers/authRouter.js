const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const validation = require("../utils/validation");

router.get("/register", (req, res) => {
  res.render("sign-up-form");
});
router.post(
  "/register",
  validation.signUp(),
  validation.validate,
  authController.signUp,
);
router.get("/login", (req, res) => {
  res.render("log-in-form");
});

router.post(
  "/login",
  validation.logIn(),
  validation.validate,
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

module.exports = router;
