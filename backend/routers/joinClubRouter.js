const router = require("express").Router();
const joinClubController = require("../controllers/joinClubController");
const rules = require("../utils/validationRules");
const middlewares = require("../utils/middlewares");
router.get("/", (req, res) => {
  res.render("join-club");
});

router.post(
  "/",
  rules.joinClubRules(),
  middlewares.validate,
  joinClubController,
);

module.exports = router;
