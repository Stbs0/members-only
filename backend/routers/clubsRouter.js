const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const rules = require("../utils/validationRules");
const middlewares = require("../utils/middlewares");

router.post(
  "/:clubId/join",
  middlewares.isAuthenticated,
  rules.joinClub(),
  middlewares.validate,
  clubsController.joinClub,
);

module.exports = router;
