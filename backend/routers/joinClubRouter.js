const router = require("express").Router();
const joinClubController = require("../controllers/joinClubController");
const rules = require("../utils/validationRules");
const middleware=require('../utils/middlewares')
const middlewares = require("../utils/middlewares");
router.get("/", (req, res) => {
  res.render("join-club");
});

router.post(
  "/",middleware.isAutherized,
  rules.joinClubRules(),
  middlewares.validate,
  joinClubController,
);

module.exports = router;
